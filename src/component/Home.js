import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import Particlebackground from "../config/particlebackground";

export const Home = () => {
  const [items, setItems] = useState([]);

  const getItems = () => {
    axios({
      method: "GET",
      url: "http://localhost:3000/items",
    })
      .then((result) => {
        setItems(result.data);
        // console.log(result.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/items/delete/${id}`);
        getItems();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      Swal.fire("Error", "An error occurred while deleting the item.", "error");
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="container">
      <Particlebackground />
      <h3
        style={{ fontFamily: "Cairo, sans-serif" }}
        className="text-white text-center mt-4"
      >
        Item Page
      </h3>
      <table className="table table-bordered">
        <thead className="table-info">
          <tr className="text-center">
            <th style={{ fontFamily: "Lora, sans-serif" }}>Id</th>
            <th style={{ fontFamily: "Lora, sans-serif" }}>Name</th>
            <th style={{ fontFamily: "Lora, sans-serif" }}>Category</th>
            <th style={{ fontFamily: "Lora, sans-serif" }}>Price</th>
            <th style={{ fontFamily: "Lora, sans-serif" }}>Stock</th>
            <th style={{ fontFamily: "Lora, sans-serif" }}>UserId</th>
            <th style={{ fontFamily: "Lora, sans-serif" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const { id, name, category, price, stock, UserId } = item;
            const jumlah_row = index % 2 === 0;
            return (
              <tr
                key={id}
                className={jumlah_row ? "table-light" : "table-secondary"}
              >
                <td style={{ fontFamily: "Cairo, sans-serif" }}>{id}</td>
                <td style={{ fontFamily: "Cairo, sans-serif" }}>{name}</td>
                <td style={{ fontFamily: "Cairo, sans-serif" }}>{category}</td>
                <td style={{ fontFamily: "Roboto Mono, sans-serif" }}>
                  Rp. {price}
                </td>
                <td style={{ fontFamily: "Cairo, sans-serif" }}>{stock} pcs</td>
                <td style={{ fontFamily: "Cairo, sans-serif" }}>{UserId}</td>
                <td className="text-center">
                  <button
                    onClick={() => deleteHandler(id)}
                    className="btn btn-sm btn-danger"
                  >
                    <MdDeleteOutline className="me-1" />
                    Delete
                  </button>
                  <button className="btn btn-sm btn-info ms-2">
                    <MdOutlineModeEdit className="me-1" />
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
