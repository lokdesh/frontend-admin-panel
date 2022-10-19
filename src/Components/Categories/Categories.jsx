import React, { useContext, useEffect, useState } from "react";
import Axios from "../Axios/Axios";
import { AuthContext } from "../../App";
import EditCategory from "./EditCategory";
const Categories = () => {
  const { userData } = useContext(AuthContext);
  const [ShowForm, setShowForm] = useState(false);
  const [UpdateForm, setUpdateForm] = useState(false);
  const [CategoryList, setCategoryList] = useState([
    {
      _id: "",
      category: "",
      parent: "",
      categoryUrl: "",
      sortOrder: "",
      showInChild: "",
      menu: "",
      metaTitle: "",
      metaDesc: "",
    },
  ]);
  const [EditForm, setEditForm] = useState({
    _id: "",
    category: "",
    parent: "",
    categoryUrl: "",
    sortOrder: "",
    showInChild: "",
    menu: "",
    metaTitle: "",
    metaDesc: "",
  });
  const showCategoryList = async () => {
    setCategoryList([
      {
        _id: "245fyjfr2424svdv",
        category: "ajab gajab",
        parent: "...",
        categoryUrl: "ajab-gajab",
        sortOrder: "1",
        showInChild: "No",
        menu: "No",
        metaTitle: "Ajab-gajab",
        metaDesc:
          "Ajab-gajab Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, velit, doloribus fugiat magni placeat animi quis numquam unde similique modi error labore ut assumenda. Fugit?",
      },
      {
        _id: "245fyjfaass4svdv",
        category: "Bhopal",
        parent: "Madhya Pradesh",
        categoryUrl: "bhopal",
        sortOrder: "1",
        showInChild: "No",
        menu: "No",
        metaTitle: "bhopal",
        metaDesc: "Bhopal",
      },
      {
        _id: "245fyjfrcasca4svdv",
        category: "Indore",
        parent: "Madhya Pradesh",
        categoryUrl: "indore",
        sortOrder: "1",
        showInChild: "No",
        menu: "No",
        metaTitle: "indore",
        metaDesc: "indore",
      },
    ]);
  };
  useEffect(() => {
    showCategoryList();
  }, []);
  const handleAdd = (e) => {
    setShowForm(true);
  };
  const updateCategory = (e) => {
    e.preventDefault();
    setShowForm(false);
    setUpdateForm(false);
    console.log("Update Category");
  };
  const addCategory = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: JSON.parse(localStorage.getItem("accessToken")),
      },
    };
    // const res = await Axios.post("/addCategory", EditForm, config);
    // setCategoryList(res.data.user.Categories);
    setShowForm(false);
  };
  const handleEdit = async (item) => {
    setUpdateForm(true);
    setShowForm(true);
    setEditForm(item);
  };
  const handleDelete = async (item) => {
    if (window.confirm("Are you sure you want to Remove this news?")) {
      const config = {
        headers: {
          token: JSON.parse(localStorage.getItem("accessToken")),
        },
      };
      await Axios.delete(`/news`, {
        data: { newsId: item._id, folderId: item.folderId },
        headers: config.headers,
      });
      showCategoryList();
    }
  };
  return (
    <>
      {/* news Categories */}
      <div className="container">
        {!ShowForm && (
          <div className="row">
            <h1 className="display-6">Categories :- </h1>
            <div className="col-12">  
              <div className="col-12">
                <button
                  onClick={() => {
                    setShowForm(true);
                    setUpdateForm(false);
                  }}
                  className="btn btn-primary  mb-2"
                >
                  <i className="bi bi-plus-circle-dotted"> </i>
                  Add Category
                </button>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive">
                        <table className="table table-striped" id="table-1">
                          <thead>
                            <tr>
                              <th className="text-center">S.No</th>
                              <th className="text-center">Category</th>
                              <th className="text-center">Parent</th>
                              <th className="text-center">Category Url</th>
                              <th className="text-center">Sort Order</th>
                              <th className="text-center">Show In Child</th>
                              <th className="text-center">Menu</th>
                              <th className="text-center">Meta Title</th>
                              <th className="text-center">Meta Desc.</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {CategoryList.length > 0 &&
                              CategoryList.map((item, index) => (
                                <tr key={index}>
                                  <td className="align-middle">{index + 1}</td>
                                  <td className="align-middle">
                                    {item.category}
                                  </td>
                                  <td className="align-middle">
                                    {item.parent}
                                  </td>
                                  <td className="align-middle">
                                    {item.categoryUrl}
                                  </td>
                                  <td className="align-middle">
                                    {item.sortOrder}
                                  </td>
                                  <td className="align-middle">
                                    {item.showInChild}
                                  </td>
                                  <td className="align-middle">{item.menu}</td>
                                  <td className="align-middle">
                                    {item.metaTitle}
                                  </td>
                                  <td className="align-middle">
                                    {item.metaDesc}
                                  </td>
                                  <td className="align-middle">
                                    <button
                                      onClick={() => handleEdit(item)}
                                      className="btn btn-success"
                                    >
                                      <i className="bi bi-pencil-square" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(item)}
                                      className="btn btn-danger"
                                    >
                                      <i className="bi bi-trash" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {ShowForm && (
          <EditCategory
            EditForm={EditForm}
            setEditForm={setEditForm}
            setShowForm={setShowForm}
            SubmitForm={UpdateForm ? updateCategory : addCategory}
            UpdateForm={UpdateForm}
          />
        )}
      </div>
    </>
  );
};

export default Categories;
