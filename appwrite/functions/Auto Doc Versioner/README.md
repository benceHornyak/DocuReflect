# Auto Doc Versioner 🧩

Welcome to the documentation of this function 👋

## 🤖 Documentation

This function expects no input from the user nor has any meaningful output for now.

It gets triggered on `doc` update and create event and creates a new document in the `doc-versions` collection (you have to provide the collection ID as an env).

## 📝 Environment Variables

List of environment variables used by this cloud function:

- **APPWRITE_FUNCTION_ENDPOINT** - Endpoint of Appwrite project
- **APPWRITE_FUNCTION_API_KEY** - Appwrite API Key
- **VERSIONS_COLLECTION_ID** - The collection id where you want to collect your version documents
