import fetch from 'node-fetch';
import { getCookie } from '../utils/cookies';

export class RestClient {
  getToken() {
    return getCookie('token');
  }

  createUrl(url) {
    console.log('api', process.env);
    return `${process.env.API_HOST}${url}`;
  }

  createHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: this.getToken()
    };
  }

  asyncGet(url) {
    return fetch(this.createUrl(url), {
      method: 'GET',
      headers: this.createHeaders()
    });
  }

  asyncPost(url, data) {
    return fetch(this.createUrl(url), {
      method: 'POST',
      headers: this.createHeaders(),
      body: JSON.stringify(data)
    });
  }
}
