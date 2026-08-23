import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

const HTTP_STATUS_CODES = [
  { code: 100, phrase: 'Continue', category: '1xx Informational', description: 'The server has received the request headers and the client should proceed to send the request body.' },
  { code: 101, phrase: 'Switching Protocols', category: '1xx Informational', description: 'The requester has asked the server to switch protocols and the server has agreed to do so.' },
  { code: 200, phrase: 'OK', category: '2xx Success', description: 'Standard response for successful HTTP requests.' },
  { code: 201, phrase: 'Created', category: '2xx Success', description: 'The request has been fulfilled, resulting in the creation of a new resource.' },
  { code: 202, phrase: 'Accepted', category: '2xx Success', description: 'The request has been accepted for processing, but the processing has not been completed.' },
  { code: 204, phrase: 'No Content', category: '2xx Success', description: 'The server successfully processed the request and is not returning any content.' },
  { code: 301, phrase: 'Moved Permanently', category: '3xx Redirection', description: 'This and all future requests should be directed to the given URI.' },
  { code: 302, phrase: 'Found', category: '3xx Redirection', description: 'Tells the client to look at another URL.' },
  { code: 304, phrase: 'Not Modified', category: '3xx Redirection', description: 'Indicates that the resource has not been modified since the version specified by the request headers.' },
  { code: 400, phrase: 'Bad Request', category: '4xx Client Error', description: 'The server cannot or will not process the request due to an apparent client error.' },
  { code: 401, phrase: 'Unauthorized', category: '4xx Client Error', description: 'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.' },
  { code: 403, phrase: 'Forbidden', category: '4xx Client Error', description: 'The request contained valid data and was understood by the server, but the server is refusing action.' },
  { code: 404, phrase: 'Not Found', category: '4xx Client Error', description: 'The requested resource could not be found but may be available in the future.' },
  { code: 405, phrase: 'Method Not Allowed', category: '4xx Client Error', description: 'A request method is not supported for the requested resource.' },
  { code: 409, phrase: 'Conflict', category: '4xx Client Error', description: 'Indicates that the request could not be processed because of conflict in the current state of the resource.' },
  { code: 418, phrase: 'I\'m a teapot', category: '4xx Client Error', description: 'The server refuses the attempt to brew coffee with a teapot.' },
  { code: 422, phrase: 'Unprocessable Entity', category: '4xx Client Error', description: 'The request was well-formed but was unable to be followed due to semantic errors.' },
  { code: 429, phrase: 'Too Many Requests', category: '4xx Client Error', description: 'The user has sent too many requests in a given amount of time ("rate limiting").' },
  { code: 500, phrase: 'Internal Server Error', category: '5xx Server Error', description: 'A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.' },
  { code: 502, phrase: 'Bad Gateway', category: '5xx Server Error', description: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.' },
  { code: 503, phrase: 'Service Unavailable', category: '5xx Server Error', description: 'The server cannot handle the request (because it is overloaded or down for maintenance).' },
  { code: 504, phrase: 'Gateway Timeout', category: '5xx Server Error', description: 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.' },
];

export default function HttpStatusCodeLookup() {
  const [search, setSearch] = useState('');

  const filteredCodes = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return HTTP_STATUS_CODES;

    return HTTP_STATUS_CODES.filter(
      (status) =>
        status.code.toString().includes(query) ||
        status.phrase.toLowerCase().includes(query) ||
        status.category.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '0', display: 'flex', alignItems: 'center', paddingLeft: '0.75rem', pointerEvents: 'none', color: 'var(--color-muted-foreground)' }}>
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search by code (e.g. 404) or phrase (e.g. Not Found)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
          style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', fontSize: '1rem' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredCodes.length > 0 ? (
          filteredCodes.map((status) => (
            <div
              key={status.code}
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--color-primary)' }}>
                  {status.code}
                </span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-foreground)' }}>
                  {status.phrase}
                </h3>
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-muted-foreground)',
                    fontWeight: 500,
                  }}
                >
                  {status.category}
                </span>
              </div>
              <p style={{ color: 'var(--color-muted-foreground)', lineHeight: 1.5 }}>
                {status.description}
              </p>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted-foreground)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            No HTTP status codes found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
