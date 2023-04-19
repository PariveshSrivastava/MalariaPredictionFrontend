import React, { useState, useEffect } from 'react'

export default function ImageRetrival() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getImages() {
      const response = await fetch(process.env.RREACT_APP_HOST+'/fetchImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setImages(data.images);
    }
    getImages();
  }, []);

  return (
    <>
      <h1 className="fw-light">Previous Prediction Results</h1>
      <table className="table table-hover" id="tab">
        <thead className="bg-dark text-white sticky-top">
          <tr>
            <th>Image</th>
            <th className="text-center">Prediction</th>
            <th className="text-center">Label</th>
          </tr>
        </thead>
        <tbody>
          {
            images != null ?
              images.map((row) =>
                <tr key={row._id}>
                  <td><img className="img-thumbnail" src={row.image} alt="input" /></td>
                  <td className="text-center">{row.prediction}</td>
                  <td className="text-center">{row.label ? <p className="text-success">Correct</p> : <p className="text-danger">Wrong</p>}</td>
                </tr>
              ) : null
          }
        </tbody>
      </table>
    </>
  );
}
