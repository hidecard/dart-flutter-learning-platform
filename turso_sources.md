# Turso/libSQL Migration References

The platform will use `@libsql/client` to connect its Node.js server to the remote Turso database through a `libsql://` URL and an authentication token supplied as environment variables. Turso documents this package as its TypeScript client for remote libSQL/Turso Cloud connections and ORM integration.

The schema migration workflow will use versioned SQL statements executed against the remote database. The database URL and token must not be committed to source control; they are deployment secrets.

## Official Sources

1. [Turso TypeScript Quickstart](https://docs.turso.tech/sdk/ts/quickstart)
2. [Turso TypeScript Client Reference](https://docs.turso.tech/sdk/ts/reference)
3. [Turso SQL over HTTP Quickstart](https://docs.turso.tech/sdk/http/quickstart)
4. [Turso Local Development Guidance](https://docs.turso.tech/local-development)
