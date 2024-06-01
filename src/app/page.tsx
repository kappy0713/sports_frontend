"use client";

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState('');

  const URL = process.env.SERVER_URL;
  if (!URL) {
    throw new Error('SERVER_URL is not defined');
  }
  useEffect(() => {
    fetch(URL)
      .then(response => response.text())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Response from Go Server</h1>
      <p>{data}</p>
    </div>
  );
}
