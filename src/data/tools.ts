import { lazy } from 'react';
import type { Tool } from '../types/tool';



const WordCounter = lazy(() => import('../tools/text/WordCounter'));
const CaseConverter = lazy(() => import('../tools/text/CaseConverter'));
const TextDiffChecker = lazy(() => import('../tools/text/TextDiffChecker'));
const RemoveDuplicateLines = lazy(() => import('../tools/text/RemoveDuplicateLines'));
const SortLines = lazy(() => import('../tools/text/SortLines'));
const WhitespaceCleaner = lazy(() => import('../tools/text/WhitespaceCleaner'));
const SlugGenerator = lazy(() => import('../tools/text/SlugGenerator'));

const HtmlFormatter = lazy(() => import('../tools/formatters/HtmlFormatter'));
const CssFormatter = lazy(() => import('../tools/formatters/CssFormatter'));
const JavaScriptFormatter = lazy(() => import('../tools/formatters/JavaScriptFormatter'));
const SqlFormatter = lazy(() => import('../tools/formatters/SqlFormatter'));
const XmlFormatter = lazy(() => import('../tools/formatters/XmlFormatter'));

const JsonFormatter = lazy(() => import('../tools/json/JsonFormatter'));
const JsonValidator = lazy(() => import('../tools/json/JsonValidator'));
const JsonMinifier = lazy(() => import('../tools/json/JsonMinifier'));
const JsonViewer = lazy(() => import('../tools/json/JsonViewer'));
const JsonToCsv = lazy(() => import('../tools/json/JsonToCsv'));
const CsvToJson = lazy(() => import('../tools/json/CsvToJson'));

const Base64Encoder = lazy(() => import('../tools/encoding/Base64Encoder'));
const Base64Decoder = lazy(() => import('../tools/encoding/Base64Decoder'));
const UrlEncoder = lazy(() => import('../tools/encoding/UrlEncoder'));
const UrlDecoder = lazy(() => import('../tools/encoding/UrlDecoder'));
const HtmlEncoder = lazy(() => import('../tools/encoding/HtmlEncoder'));
const HtmlDecoder = lazy(() => import('../tools/encoding/HtmlDecoder'));

const UuidGenerator = lazy(() => import('../tools/generators/UuidGenerator'));
const PasswordGenerator = lazy(() => import('../tools/generators/PasswordGenerator'));
const RandomStringGenerator = lazy(() => import('../tools/generators/RandomStringGenerator'));
const LoremIpsumGenerator = lazy(() => import('../tools/generators/LoremIpsumGenerator'));
const QrCodeGenerator = lazy(() => import('../tools/generators/QrCodeGenerator'));

const JwtDecoder = lazy(() => import('../tools/web/JwtDecoder'));
const HttpStatusCodeLookup = lazy(() => import('../tools/web/HttpStatusCodeLookup'));
const UserAgentParser = lazy(() => import('../tools/web/UserAgentParser'));
const UrlParser = lazy(() => import('../tools/web/UrlParser'));

const RegexTester = lazy(() => import('../tools/regex/RegexTester'));
const RegexGenerator = lazy(() => import('../tools/regex/RegexGenerator'));

const UnixTimestampConverter = lazy(() => import('../tools/datetime/UnixTimestampConverter'));
const DateTimeConverter = lazy(() => import('../tools/datetime/DateTimeConverter'));
const CronExpressionGenerator = lazy(() => import('../tools/datetime/CronExpressionGenerator'));

const Md5HashGenerator = lazy(() => import('../tools/security/Md5HashGenerator'));
const ShaHashGenerator = lazy(() => import('../tools/security/ShaHashGenerator'));
const HmacGenerator = lazy(() => import('../tools/security/HmacGenerator'));

const ColorConverter = lazy(() => import('../tools/colors/ColorConverter'));
const ColorPicker = lazy(() => import('../tools/colors/ColorPicker'));
const ContrastChecker = lazy(() => import('../tools/colors/ContrastChecker'));

const MockDataGenerator = lazy(() => import('../tools/testing/MockDataGenerator'));
const JsonSchemaValidator = lazy(() => import('../tools/testing/JsonSchemaValidator'));

const CsvViewer = lazy(() => import('../tools/data/CsvViewer'));
const JsonPathTester = lazy(() => import('../tools/data/JsonPathTester'));

const SubnetCalculator = lazy(() => import('../tools/networking/SubnetCalculator'));
const MacAddressGenerator = lazy(() => import('../tools/networking/MacAddressGenerator'));

const ChmodCalculator = lazy(() => import('../tools/developer/ChmodCalculator'));
const BcryptGenerator = lazy(() => import('../tools/developer/BcryptGenerator'));

const SqlToJson = lazy(() => import('../tools/sql/SqlToJson'));
const YamlToJson = lazy(() => import('../tools/converters/YamlToJson'));

export const tools: Tool[] = [
  // ═══════════════════════════════════════
  // JSON TOOLS
  // ═══════════════════════════════════════
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and beautify JSON data with proper indentation.',
    category: 'json',
    icon: 'Braces',
    keywords: ['json', 'format', 'beautify', 'pretty', 'indent'],
    featured: true,
    popular: true,
    component: JsonFormatter,
    seoTitle: 'JSON Formatter - Format JSON Online | Devora',
    seoDescription: 'Format and beautify JSON data with proper indentation. Free online JSON formatter tool.',
  },
  {
    id: 'json-validator',
    slug: 'json-validator',
    name: 'JSON Validator',
    description: 'Validate JSON syntax and find errors instantly.',
    category: 'json',
    icon: 'CheckCircle',
    keywords: ['json', 'validate', 'check', 'syntax', 'error'],
    featured: false,
    popular: true,
    component: JsonValidator,
    seoTitle: 'JSON Validator - Validate JSON Online | Devora',
    seoDescription: 'Validate JSON syntax and find errors instantly. Free online JSON validator tool.',
  },
  {
    id: 'json-minifier',
    slug: 'json-minifier',
    name: 'JSON Minifier',
    description: 'Minify JSON by removing whitespace and formatting.',
    category: 'json',
    icon: 'Minimize2',
    keywords: ['json', 'minify', 'compress', 'compact', 'small'],
    featured: false,
    popular: false,
    component: JsonMinifier,
    seoTitle: 'JSON Minifier - Minify JSON Online | Devora',
    seoDescription: 'Minify JSON by removing whitespace and formatting. Free online JSON minifier tool.',
  },
  {
    id: 'json-viewer',
    slug: 'json-viewer',
    name: 'JSON Viewer',
    description: 'View and explore nested JSON data in a tree structure.',
    category: 'json',
    icon: 'Eye',
    keywords: ['json', 'viewer', 'tree', 'explore', 'nested'],
    featured: false,
    popular: false,
    component: JsonViewer,
    seoTitle: 'JSON Viewer - View JSON Tree Online | Devora',
    seoDescription: 'View and explore nested JSON data in a tree structure. Free online JSON viewer tool.',
  },
  {
    id: 'json-to-csv',
    slug: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Convert JSON arrays into CSV format for spreadsheets.',
    category: 'converters',
    icon: 'FileSpreadsheet',
    keywords: ['json', 'csv', 'convert', 'spreadsheet', 'export'],
    featured: false,
    popular: false,
    component: JsonToCsv,
    seoTitle: 'JSON to CSV Converter | Devora',
    seoDescription: 'Convert JSON arrays into CSV format for spreadsheets. Free online JSON to CSV converter.',
  },
  {
    id: 'csv-to-json',
    slug: 'csv-to-json',
    name: 'CSV to JSON',
    description: 'Convert CSV data into structured JSON format.',
    category: 'converters',
    icon: 'FileJson',
    keywords: ['csv', 'json', 'convert', 'import', 'parse'],
    featured: false,
    popular: false,
    component: CsvToJson,
    seoTitle: 'CSV to JSON Converter | Devora',
    seoDescription: 'Convert CSV data into structured JSON format. Free online CSV to JSON converter.',
  },

  // ═══════════════════════════════════════
  // ENCODING & DECODING
  // ═══════════════════════════════════════
  {
    id: 'base64-encoder',
    slug: 'base64-encoder',
    name: 'Base64 Encoder',
    description: 'Encode text or data to Base64 format.',
    category: 'encoding',
    icon: 'Lock',
    keywords: ['base64', 'encode', 'encryption', 'convert'],
    featured: false,
    popular: true,
    component: Base64Encoder,
    seoTitle: 'Base64 Encoder - Encode Text to Base64 | Devora',
    seoDescription: 'Encode text or data to Base64 format. Free online Base64 encoder tool.',
  },
  {
    id: 'base64-decoder',
    slug: 'base64-decoder',
    name: 'Base64 Decoder',
    description: 'Decode Base64 encoded strings back to plain text.',
    category: 'encoding',
    icon: 'Unlock',
    keywords: ['base64', 'decode', 'decryption', 'convert'],
    featured: false,
    popular: true,
    component: Base64Decoder,
    seoTitle: 'Base64 Decoder - Decode Base64 to Text | Devora',
    seoDescription: 'Decode Base64 encoded strings back to plain text. Free online Base64 decoder tool.',
  },
  {
    id: 'url-encoder',
    slug: 'url-encoder',
    name: 'URL Encoder',
    description: 'Encode special characters in URLs for safe transmission.',
    category: 'encoding',
    icon: 'Link',
    keywords: ['url', 'encode', 'percent', 'uri', 'escape'],
    featured: false,
    popular: false,
    component: UrlEncoder,
    seoTitle: 'URL Encoder - Encode URLs Online | Devora',
    seoDescription: 'Encode special characters in URLs for safe transmission. Free online URL encoder tool.',
  },
  {
    id: 'url-decoder',
    slug: 'url-decoder',
    name: 'URL Decoder',
    description: 'Decode percent-encoded URLs back to readable text.',
    category: 'encoding',
    icon: 'LinkBreak',
    keywords: ['url', 'decode', 'percent', 'uri', 'unescape'],
    featured: false,
    popular: false,
    component: UrlDecoder,
    seoTitle: 'URL Decoder - Decode URLs Online | Devora',
    seoDescription: 'Decode percent-encoded URLs back to readable text. Free online URL decoder tool.',
  },
  {
    id: 'html-encoder',
    slug: 'html-encoder',
    name: 'HTML Encoder',
    description: 'Encode HTML entities to prevent XSS and display issues.',
    category: 'encoding',
    icon: 'FileCode',
    keywords: ['html', 'encode', 'entity', 'escape', 'xss'],
    featured: false,
    popular: false,
    component: HtmlEncoder,
    seoTitle: 'HTML Encoder - Encode HTML Entities | Devora',
    seoDescription: 'Encode HTML entities to prevent XSS and display issues. Free online HTML encoder tool.',
  },
  {
    id: 'html-decoder',
    slug: 'html-decoder',
    name: 'HTML Decoder',
    description: 'Decode HTML entities back to their original characters.',
    category: 'encoding',
    icon: 'FileText',
    keywords: ['html', 'decode', 'entity', 'unescape'],
    featured: false,
    popular: false,
    component: HtmlDecoder,
    seoTitle: 'HTML Decoder - Decode HTML Entities | Devora',
    seoDescription: 'Decode HTML entities back to their original characters. Free online HTML decoder tool.',
  },

  // ═══════════════════════════════════════
  // GENERATORS
  // ═══════════════════════════════════════
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate one or multiple random UUIDs (v4).',
    category: 'generators',
    icon: 'Fingerprint',
    keywords: ['uuid', 'guid', 'generate', 'random', 'unique', 'id'],
    featured: true,
    popular: true,
    component: UuidGenerator,
    seoTitle: 'UUID Generator - Generate UUIDs Online | Devora',
    seoDescription: 'Generate one or multiple random UUIDs (v4). Free online UUID generator tool.',
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, secure passwords with custom options.',
    category: 'generators',
    icon: 'KeyRound',
    keywords: ['password', 'generate', 'secure', 'strong', 'random'],
    featured: false,
    popular: true,
    component: PasswordGenerator,
    seoTitle: 'Password Generator - Generate Secure Passwords | Devora',
    seoDescription: 'Generate strong, secure passwords with custom options. Free online password generator tool.',
  },
  {
    id: 'random-string-generator',
    slug: 'random-string-generator',
    name: 'Random String Generator',
    description: 'Generate random strings with configurable length and characters.',
    category: 'generators',
    icon: 'Shuffle',
    keywords: ['random', 'string', 'generate', 'characters', 'token'],
    featured: false,
    popular: false,
    component: RandomStringGenerator,
    seoTitle: 'Random String Generator | Devora',
    seoDescription: 'Generate random strings with configurable length and characters. Free online random string generator.',
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text in paragraphs, words, or sentences.',
    category: 'generators',
    icon: 'AlignLeft',
    keywords: ['lorem', 'ipsum', 'placeholder', 'text', 'dummy'],
    featured: false,
    popular: false,
    component: LoremIpsumGenerator,
    seoTitle: 'Lorem Ipsum Generator | Devora',
    seoDescription: 'Generate placeholder text in paragraphs, words, or sentences. Free online lorem ipsum generator.',
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes from text or URLs and download them.',
    category: 'generators',
    icon: 'QrCode',
    keywords: ['qr', 'code', 'generate', 'barcode', 'scan'],
    featured: true,
    popular: false,
    component: QrCodeGenerator,
    seoTitle: 'QR Code Generator | Devora',
    seoDescription: 'Generate QR codes from text or URLs and download them. Free online QR code generator.',
  },

  // ═══════════════════════════════════════
  // WEB TOOLS
  // ═══════════════════════════════════════
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode JWT tokens and inspect header and payload.',
    category: 'web',
    icon: 'KeyRound',
    keywords: ['jwt', 'decode', 'token', 'auth', 'json web token'],
    featured: true,
    popular: true,
    component: JwtDecoder,
    seoTitle: 'JWT Decoder - Decode JWT Tokens Online | Devora',
    seoDescription: 'Decode JWT tokens and inspect header and payload. Free online JWT decoder tool.',
  },
  {
    id: 'http-status-codes',
    slug: 'http-status-codes',
    name: 'HTTP Status Code Lookup',
    description: 'Look up HTTP status codes with descriptions and usage.',
    category: 'web',
    icon: 'Server',
    keywords: ['http', 'status', 'code', '404', '500', '200', 'response'],
    featured: false,
    popular: false,
    component: HttpStatusCodeLookup,
    seoTitle: 'HTTP Status Code Lookup | Devora',
    seoDescription: 'Look up HTTP status codes with descriptions and usage. Free online HTTP status code reference.',
  },
  {
    id: 'user-agent-parser',
    slug: 'user-agent-parser',
    name: 'User-Agent Parser',
    description: 'Parse user agent strings to identify browser and OS.',
    category: 'web',
    icon: 'Monitor',
    keywords: ['user agent', 'parse', 'browser', 'os', 'device'],
    featured: false,
    popular: false,
    component: UserAgentParser,
    seoTitle: 'User-Agent Parser | Devora',
    seoDescription: 'Parse user agent strings to identify browser and OS. Free online user-agent parser.',
  },
  {
    id: 'url-parser',
    slug: 'url-parser',
    name: 'URL Parser',
    description: 'Parse URLs into their components (protocol, host, path, query).',
    category: 'web',
    icon: 'LinkIcon',
    keywords: ['url', 'parse', 'query', 'path', 'host', 'protocol'],
    featured: false,
    popular: false,
    component: UrlParser,
    seoTitle: 'URL Parser - Parse URLs Online | Devora',
    seoDescription: 'Parse URLs into their components. Free online URL parser tool.',
  },

  // ═══════════════════════════════════════
  // TEXT TOOLS
  // ═══════════════════════════════════════
  {
    id: 'text-analyzer',
    slug: 'text-analyzer',
    name: 'Word & Character Counter',
    description: 'Count words, characters, sentences, and paragraphs in real-time.',
    category: 'text',
    icon: 'Hash',
    keywords: ['word', 'count', 'character', 'sentence', 'paragraph', 'length', 'text'],
    featured: false,
    popular: true,
    component: WordCounter,
    seoTitle: 'Word & Character Counter | Devora',
    seoDescription: 'Count words, characters, sentences, and paragraphs. Free online text analyzer tool.',
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text between uppercase, lowercase, camelCase, snake_case, and more.',
    category: 'text',
    icon: 'CaseSensitive',
    keywords: ['case', 'convert', 'uppercase', 'lowercase', 'camel', 'snake', 'kebab'],
    featured: false,
    popular: true,
    component: CaseConverter,
    seoTitle: 'Case Converter - Convert Text Case | Devora',
    seoDescription: 'Convert text between uppercase, lowercase, camelCase, snake_case, and more.',
  },
  {
    id: 'text-diff',
    slug: 'text-diff',
    name: 'Text Diff Checker',
    description: 'Compare two texts and highlight the differences.',
    category: 'text',
    icon: 'GitCompare',
    keywords: ['diff', 'compare', 'difference', 'text', 'merge'],
    featured: true,
    popular: false,
    component: TextDiffChecker,
    seoTitle: 'Text Diff Checker - Compare Text Online | Devora',
    seoDescription: 'Compare two texts and highlight the differences. Free online text diff tool.',
  },
  {
    id: 'remove-duplicate-lines',
    slug: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    description: 'Remove duplicate lines from text while preserving order.',
    category: 'text',
    icon: 'ListX',
    keywords: ['duplicate', 'remove', 'unique', 'lines', 'deduplicate'],
    featured: false,
    popular: false,
    component: RemoveDuplicateLines,
    seoTitle: 'Remove Duplicate Lines | Devora',
    seoDescription: 'Remove duplicate lines from text while preserving order. Free online duplicate remover.',
  },
  {
    id: 'sort-lines',
    slug: 'sort-lines',
    name: 'Sort Lines',
    description: 'Sort text lines alphabetically, by length, or in reverse.',
    category: 'text',
    icon: 'ArrowUpDown',
    keywords: ['sort', 'lines', 'alphabetical', 'reverse', 'order'],
    featured: false,
    popular: false,
    component: SortLines,
    seoTitle: 'Sort Lines - Sort Text Online | Devora',
    seoDescription: 'Sort text lines alphabetically, by length, or in reverse. Free online line sorter.',
  },
  {
    id: 'whitespace-cleaner',
    slug: 'whitespace-cleaner',
    name: 'Whitespace Cleaner',
    description: 'Remove unnecessary spaces, tabs, and empty lines from text.',
    category: 'text',
    icon: 'Eraser',
    keywords: ['whitespace', 'clean', 'trim', 'spaces', 'tabs'],
    featured: false,
    popular: false,
    component: WhitespaceCleaner,
    seoTitle: 'Whitespace Cleaner | Devora',
    seoDescription: 'Remove unnecessary spaces, tabs, and empty lines from text. Free online whitespace cleaner.',
  },
  {
    id: 'slug-generator',
    slug: 'slug-generator',
    name: 'Slug Generator',
    description: 'Convert text into URL-friendly slugs.',
    category: 'text',
    icon: 'Link2',
    keywords: ['slug', 'url', 'generate', 'kebab', 'permalink'],
    featured: false,
    popular: false,
    component: SlugGenerator,
    seoTitle: 'Slug Generator - Create URL-Friendly Slugs | Devora',
    seoDescription: 'Convert text into URL-friendly slugs. Free online slug generator.',
  },

  // ═══════════════════════════════════════
  // FORMATTERS
  // ═══════════════════════════════════════
  {
    id: 'html-formatter',
    slug: 'html-formatter',
    name: 'HTML Formatter',
    description: 'Format and beautify HTML code with proper indentation.',
    category: 'formatters',
    icon: 'FileCode',
    keywords: ['html', 'format', 'beautify', 'indent', 'pretty'],
    featured: false,
    popular: false,
    component: HtmlFormatter,
    seoTitle: 'HTML Formatter - Format HTML Online | Devora',
    seoDescription: 'Format and beautify HTML code with proper indentation. Free online HTML formatter.',
  },
  {
    id: 'css-formatter',
    slug: 'css-formatter',
    name: 'CSS Formatter',
    description: 'Format and beautify CSS code.',
    category: 'formatters',
    icon: 'Paintbrush',
    keywords: ['css', 'format', 'beautify', 'style', 'indent'],
    featured: false,
    popular: false,
    component: CssFormatter,
    seoTitle: 'CSS Formatter - Format CSS Online | Devora',
    seoDescription: 'Format and beautify CSS code. Free online CSS formatter.',
  },
  {
    id: 'javascript-formatter',
    slug: 'javascript-formatter',
    name: 'JavaScript Formatter',
    description: 'Format and beautify JavaScript code.',
    category: 'formatters',
    icon: 'FileJs',
    keywords: ['javascript', 'js', 'format', 'beautify', 'indent'],
    featured: false,
    popular: false,
    component: JavaScriptFormatter,
    seoTitle: 'JavaScript Formatter - Format JS Online | Devora',
    seoDescription: 'Format and beautify JavaScript code. Free online JavaScript formatter.',
  },
  {
    id: 'sql-formatter',
    slug: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format and beautify SQL queries with proper indentation.',
    category: 'sql',
    icon: 'Database',
    keywords: ['sql', 'format', 'beautify', 'query', 'indent'],
    featured: true,
    popular: false,
    component: SqlFormatter,
    seoTitle: 'SQL Formatter - Format SQL Online | Devora',
    seoDescription: 'Format and beautify SQL queries with proper indentation. Free online SQL formatter.',
  },
  {
    id: 'xml-formatter',
    slug: 'xml-formatter',
    name: 'XML Formatter',
    description: 'Format and beautify XML data with proper indentation.',
    category: 'formatters',
    icon: 'FileCode2',
    keywords: ['xml', 'format', 'beautify', 'indent', 'pretty'],
    featured: false,
    popular: false,
    component: XmlFormatter,
    seoTitle: 'XML Formatter - Format XML Online | Devora',
    seoDescription: 'Format and beautify XML data with proper indentation. Free online XML formatter.',
  },

  // ═══════════════════════════════════════
  // DATE / TIME
  // ═══════════════════════════════════════
  {
    id: 'unix-timestamp-converter',
    slug: 'unix-timestamp-converter',
    name: 'Unix Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates.',
    category: 'date-time',
    icon: 'Clock',
    keywords: ['unix', 'timestamp', 'epoch', 'convert', 'date', 'time'],
    featured: false,
    popular: true,
    component: UnixTimestampConverter,
    seoTitle: 'Unix Timestamp Converter | Devora',
    seoDescription: 'Convert between Unix timestamps and human-readable dates. Free online timestamp converter.',
  },
  {
    id: 'date-time-converter',
    slug: 'date-time-converter',
    name: 'Date/Time Converter',
    description: 'Convert dates and times between different formats and timezones.',
    category: 'date-time',
    icon: 'CalendarClock',
    keywords: ['date', 'time', 'timezone', 'convert', 'format'],
    featured: false,
    popular: false,
    component: DateTimeConverter,
    seoTitle: 'Date/Time Converter | Devora',
    seoDescription: 'Convert dates and times between different formats and timezones. Free online date converter.',
  },
  {
    id: 'cron-expression-generator',
    slug: 'cron-expression-generator',
    name: 'Cron Expression Generator',
    description: 'Build and understand cron expressions with an intuitive UI.',
    category: 'date-time',
    icon: 'Timer',
    keywords: ['cron', 'expression', 'schedule', 'job', 'generate'],
    featured: true,
    popular: false,
    component: CronExpressionGenerator,
    seoTitle: 'Cron Expression Generator | Devora',
    seoDescription: 'Build and understand cron expressions with an intuitive UI. Free online cron generator.',
  },

  // ═══════════════════════════════════════
  // SECURITY & HASHING
  // ═══════════════════════════════════════
  {
    id: 'md5-hash-generator',
    slug: 'md5-hash-generator',
    name: 'MD5 Hash Generator',
    description: 'Generate MD5 hashes from text input.',
    category: 'security',
    icon: 'ShieldCheck',
    keywords: ['md5', 'hash', 'generate', 'checksum', 'digest'],
    featured: false,
    popular: false,
    component: Md5HashGenerator,
    seoTitle: 'MD5 Hash Generator | Devora',
    seoDescription: 'Generate MD5 hashes from text input. Free online MD5 hash generator.',
  },
  {
    id: 'sha-hash-generator',
    slug: 'sha-hash-generator',
    name: 'SHA Hash Generator',
    description: 'Generate SHA-1, SHA-256, and SHA-512 hashes.',
    category: 'security',
    icon: 'Shield',
    keywords: ['sha', 'hash', 'generate', 'sha256', 'sha512', 'checksum'],
    featured: false,
    popular: false,
    component: ShaHashGenerator,
    seoTitle: 'SHA Hash Generator | Devora',
    seoDescription: 'Generate SHA-1, SHA-256, and SHA-512 hashes. Free online SHA hash generator.',
  },
  {
    id: 'hmac-generator',
    slug: 'hmac-generator',
    name: 'HMAC Generator',
    description: 'Generate HMAC signatures using various hash algorithms.',
    category: 'security',
    icon: 'KeyRound',
    keywords: ['hmac', 'hash', 'generate', 'mac', 'signature', 'key'],
    featured: false,
    popular: false,
    component: HmacGenerator,
    seoTitle: 'HMAC Generator | Devora',
    seoDescription: 'Generate HMAC signatures using various hash algorithms. Free online HMAC generator.',
  },

  // ═══════════════════════════════════════
  // COLOR TOOLS
  // ═══════════════════════════════════════
  {
    id: 'color-converter',
    slug: 'color-converter',
    name: 'HEX/RGB/HSL Converter',
    description: 'Convert colors between HEX, RGB, and HSL formats.',
    category: 'colors',
    icon: 'Palette',
    keywords: ['color', 'hex', 'rgb', 'hsl', 'convert'],
    featured: false,
    popular: false,
    component: ColorConverter,
    seoTitle: 'Color Converter - HEX/RGB/HSL | Devora',
    seoDescription: 'Convert colors between HEX, RGB, and HSL formats. Free online color converter.',
  },
  {
    id: 'color-picker',
    slug: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors and get their values in multiple formats.',
    category: 'colors',
    icon: 'Pipette',
    keywords: ['color', 'pick', 'palette', 'swatch', 'eyedropper'],
    featured: false,
    popular: false,
    component: ColorPicker,
    seoTitle: 'Color Picker | Devora',
    seoDescription: 'Pick colors and get their values in multiple formats. Free online color picker.',
  },
  {
    id: 'contrast-checker',
    slug: 'contrast-checker',
    name: 'Contrast Checker',
    description: 'Check color contrast ratio and WCAG accessibility compliance.',
    category: 'colors',
    icon: 'Contrast',
    keywords: ['contrast', 'check', 'wcag', 'accessibility', 'a11y', 'ratio'],
    featured: false,
    popular: false,
    component: ContrastChecker,
    seoTitle: 'Contrast Checker - WCAG Accessibility | Devora',
    seoDescription: 'Check color contrast ratio and WCAG accessibility compliance. Free online contrast checker.',
  },

  // ═══════════════════════════════════════
  // REGEX TOOLS
  // ═══════════════════════════════════════
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions with real-time matching and highlighting.',
    category: 'regex',
    icon: 'Regex',
    keywords: ['regex', 'regular expression', 'test', 'match', 'pattern'],
    featured: true,
    popular: true,
    component: RegexTester,
    seoTitle: 'Regex Tester - Test Regular Expressions | Devora',
    seoDescription: 'Test regular expressions with real-time matching and highlighting. Free online regex tester.',
  },
  {
    id: 'regex-generator',
    slug: 'regex-generator',
    name: 'Regex Generator',
    description: 'Generate regular expressions with guided helpers and examples.',
    category: 'regex',
    icon: 'Wand2',
    keywords: ['regex', 'generate', 'builder', 'helper', 'pattern'],
    featured: false,
    popular: false,
    component: RegexGenerator,
    seoTitle: 'Regex Generator & Helper | Devora',
    seoDescription: 'Generate regular expressions with guided helpers and examples. Free online regex generator.',
  },
  {
    id: 'yaml-to-json',
    slug: 'yaml-to-json',
    name: 'YAML to JSON',
    description: 'Convert between YAML and JSON formats bidirectionally.',
    category: 'converters',
    icon: 'FileJson',
    keywords: ['yaml', 'json', 'convert', 'format', 'parse'],
    featured: false,
    popular: false,
    component: YamlToJson,
    seoTitle: 'YAML to JSON Converter | Devora',
    seoDescription: 'Convert between YAML and JSON formats bidirectionally. Free online YAML/JSON converter.',
  },
  {
    id: 'mock-data-generator',
    slug: 'mock-data-generator',
    name: 'Mock Data Generator',
    description: 'Generate JSON arrays of dummy data for testing.',
    category: 'testing',
    icon: 'FlaskConical',
    keywords: ['mock', 'data', 'json', 'generate', 'test', 'dummy'],
    featured: false,
    popular: false,
    component: MockDataGenerator,
    seoTitle: 'Mock Data Generator | Devora',
    seoDescription: 'Generate JSON arrays of dummy data for testing. Free online mock data generator.',
  },
  {
    id: 'json-schema-validator',
    slug: 'json-schema-validator',
    name: 'JSON Schema Validator',
    description: 'Validate JSON data against a JSON Schema.',
    category: 'testing',
    icon: 'CheckCircle',
    keywords: ['json', 'schema', 'validate', 'test', 'ajv'],
    featured: false,
    popular: false,
    component: JsonSchemaValidator,
    seoTitle: 'JSON Schema Validator | Devora',
    seoDescription: 'Validate JSON data against a JSON Schema. Free online JSON Schema validator.',
  },
  {
    id: 'csv-viewer',
    slug: 'csv-viewer',
    name: 'CSV Viewer',
    description: 'View CSV data in a clean, interactive HTML table.',
    category: 'data',
    icon: 'Table',
    keywords: ['csv', 'view', 'table', 'data', 'parse'],
    featured: false,
    popular: false,
    component: CsvViewer,
    seoTitle: 'CSV Viewer | Devora',
    seoDescription: 'View CSV data in a clean, interactive HTML table. Free online CSV viewer.',
  },
  {
    id: 'json-path-tester',
    slug: 'json-path-tester',
    name: 'JSONPath Tester',
    description: 'Test JSONPath expressions against JSON data.',
    category: 'data',
    icon: 'Search',
    keywords: ['json', 'jsonpath', 'query', 'test', 'extract'],
    featured: false,
    popular: false,
    component: JsonPathTester,
    seoTitle: 'JSONPath Tester | Devora',
    seoDescription: 'Test JSONPath expressions against JSON data. Free online JSONPath tester.',
  },
  {
    id: 'subnet-calculator',
    slug: 'subnet-calculator',
    name: 'Subnet Calculator',
    description: 'Calculate IP ranges, CIDR blocks, and subnet masks.',
    category: 'networking',
    icon: 'Wifi',
    keywords: ['ip', 'subnet', 'cidr', 'network', 'calculator'],
    featured: false,
    popular: false,
    component: SubnetCalculator,
    seoTitle: 'Subnet Calculator | Devora',
    seoDescription: 'Calculate IP ranges, CIDR blocks, and subnet masks. Free online IP subnet calculator.',
  },
  {
    id: 'mac-address-generator',
    slug: 'mac-address-generator',
    name: 'MAC Address Generator',
    description: 'Generate random MAC addresses with configurable formats.',
    category: 'networking',
    icon: 'Network',
    keywords: ['mac', 'address', 'generate', 'random', 'network'],
    featured: false,
    popular: false,
    component: MacAddressGenerator,
    seoTitle: 'MAC Address Generator | Devora',
    seoDescription: 'Generate random MAC addresses with configurable formats. Free online MAC address generator.',
  },
  {
    id: 'chmod-calculator',
    slug: 'chmod-calculator',
    name: 'Chmod Calculator',
    description: 'Visual Unix permissions calculator with octal and symbolic outputs.',
    category: 'developer',
    icon: 'Unlock',
    keywords: ['chmod', 'permissions', 'unix', 'linux', 'calculator'],
    featured: false,
    popular: false,
    component: ChmodCalculator,
    seoTitle: 'Chmod Calculator | Devora',
    seoDescription: 'Visual Unix permissions calculator with octal and symbolic outputs. Free online chmod calculator.',
  },
  {
    id: 'bcrypt-generator',
    slug: 'bcrypt-generator',
    name: 'Bcrypt Generator',
    description: 'Hash and verify passwords using Bcrypt.',
    category: 'developer',
    icon: 'Lock',
    keywords: ['bcrypt', 'hash', 'password', 'verify', 'security'],
    featured: false,
    popular: false,
    component: BcryptGenerator,
    seoTitle: 'Bcrypt Hash Generator | Devora',
    seoDescription: 'Hash and verify passwords using Bcrypt. Free online Bcrypt generator and verifier.',
  },
  {
    id: 'sql-to-json',
    slug: 'sql-to-json',
    name: 'SQL to JSON',
    description: 'Parse SQL INSERT statements and convert them into structured JSON.',
    category: 'sql',
    icon: 'Database',
    keywords: ['sql', 'json', 'convert', 'insert', 'parse'],
    featured: false,
    popular: false,
    component: SqlToJson,
    seoTitle: 'SQL to JSON Converter | Devora',
    seoDescription: 'Parse SQL INSERT statements and convert them into structured JSON. Free online SQL to JSON converter.',
  }
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((t) => t.category === categorySlug);
}

export function getPopularTools(): Tool[] {
  return tools.filter((t) => t.popular);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.toLowerCase().includes(q))
  );
}

export function getToolCountByCategory(categorySlug: string): number {
  return tools.filter((t) => t.category === categorySlug).length;
}
