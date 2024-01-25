const _URL = "http://localhost:8888/hello-world";

export interface CustomBody {
  [key: string]: string;
}
  
export interface CustomHeaders {
  [key: string]: string;
}

export const postData = async (...args: any[]): Promise<CustomBody | null> => {
  const u = args[0], headers = args[1], body = args[2];

  try {
    const url = u || _URL;
    const requestOptions = {
      method: 'POST',
      headers: headers ? headers : { "Content-Type": "application/json" },
      ...(body && { body: JSON.stringify(body) })
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
  