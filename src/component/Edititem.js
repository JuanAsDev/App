import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import "../component/css/csscomponent.css";

const EditItem = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    UserId: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/items/details/${id}`)
      .then((response) => {
        setItemData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/items/update/${id}`, itemData);

      Swal.fire({
        title: "Success",
        text: "Data has been updated successfully!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating item: ", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while updating the item.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="container my-5">
      <div className="card mx-auto" style={{ maxWidth: "510px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Edit Item</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Nama :
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={itemData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="category" className="col-sm-2 col-form-label">
                Kategori
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={itemData.category}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="price" className="col-sm-2 col-form-label">
                Harga
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={itemData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="stock" className="col-sm-2 col-form-label">
                Stok
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="stock"
                  name="stock"
                  value={itemData.stock}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="UserId" className="col-sm-2 col-form-label">
                UserId
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="UserId"
                  name="UserId"
                  value={itemData.UserId}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-10 offset-sm-2">
                <button type="submit" className="btn btn-primary">
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
