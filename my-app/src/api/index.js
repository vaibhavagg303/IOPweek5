import axios from 'axios';

const url = 'http://localhost:8000';

export const contact = async (formData) => {
  try {
    console.log({formData});
    const { data } = await axios.post(`${url}/stations/contact`, {
        headers: {
          "Access-Control-Allow-Credentials": 'true',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json;charset=utf-8",
              
          },
            data: formData
    });
    console.log({data});
    return data;
  } catch (error) {
    console.log({formData});
    console.log(error);
  }
}