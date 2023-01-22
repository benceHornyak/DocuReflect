const sdk = require('node-appwrite');

module.exports = async function (req, res) {
  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY'] ||
    !req.variables['VERSIONS_COLLECTION_ID']
  ) {
    console.error('Environment variables are not set');
    process.exit(1);
  }

  const client = new sdk.Client();
  const database = new sdk.Databases(client);

  client
    .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
    .setSelfSigned(true);

  const data = JSON.parse(req.variables['APPWRITE_FUNCTION_EVENT_DATA']);
  const versionsCollectionId = req.variables['VERSIONS_COLLECTION_ID'];

  const alreadyExistingVersionDocs = await database.listDocuments(
    data.$databaseId,
    versionsCollectionId,
    [sdk.Query.equal('docId', data.$id)]
  );

  const version =
    alreadyExistingVersionDocs.total > 0
      ? ++alreadyExistingVersionDocs.documents[
          alreadyExistingVersionDocs.documents.length - 1
        ].version
      : 1;

  await database.createDocument(
    data.$databaseId,
    versionsCollectionId,
    'unique()',
    { text: data.text, docId: data.$id, version }
  );

  res.send();
};
