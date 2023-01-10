export const fetchMetadata = async (serviceURI) => {
  const result = {
    name: null,
    description: null,
    image: null  
  }

  const service = serviceURI.split("://")[0];
  const uri = serviceURI.split("://")[1];

  if (service.localeCompare("ipfs") === 0) {
    try {
      const metadataRes = await fetch(`https://gateway.ipfs.io/ipfs/${uri}`);
      const metadata = await metadataRes.json();
      const imageRes = await fetch(
        `https://gateway.ipfs.io/ipfs/${metadata.image.split("://")[1]}`
      );
      result.name = metadata.name;
      result.description = metadata.description;
      result.image = imageRes.url;
    } catch (e) {
      console.log("ipfs fetch error", e);
    }
  } else if (service.localeCompare("ar") === 0) {
    try {
      const metadataRes = await fetch(`https://arweave.net/${uri}`);
      const metadata = await metadataRes.json();
      const imageRes = await fetch(
        `https://arweave.net/${metadata.image.split("://")[1]}`
      );
      result.name = metadata.name;
      result.description = metadata.description;
      result.image = imageRes.url;
    } catch (e) {
      console.log("arweave fetch error", e);
    }
  } else {
    try {

    } catch (e) {
      console.log("arweave fetch error", e);
    }
  }

  return result;
};
