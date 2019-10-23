import fetch from 'node-fetch';
import { getCookie } from '../utils/cookies';

export class RestClient {
  getToken() {
    return getCookie('token');
  }

  createUrl(url) {
    return `${process.env.REACT_APP_API_HOST}${url}`;
  }

  createHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`
    };
  }

  async asyncGet(url) {
    const res = await fetch(this.createUrl(url), {
      method: 'GET',
      headers: this.createHeaders()
    });

    return res.json();
  }

  async asyncPost(url, data) {
    const res = await fetch(this.createUrl(url), {
      method: 'POST',
      headers: this.createHeaders(),
      body: JSON.stringify(data)
    });

    return res.json();
  }
}
