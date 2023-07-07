const BASE_API_URL = "http://127.0.0.1:3000/api/v1";

export class Api {
  private baseUrl = BASE_API_URL;

  public Get = async <T>(url: string): Promise<T> => {
    const response = await fetch(`${this.baseUrl}/${url}`);
    if (!response.ok) {
      throw new Error("Failed to fetch solved data");
    }
    const data = await response.json();
    return data.data as T;
  };

  public Post = async <T, V>(url: string, payload: T): Promise<V> => {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ puzzle: payload }),
    });
    if (!response.ok) {
      throw new Error("Failed to post solved data");
    }
    const data = await response.json();
    return data.data as V;
  };
}
