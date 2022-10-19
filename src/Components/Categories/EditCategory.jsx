import React from "react";

const EditCategory = ({
  EditForm,
  setEditForm,
  setShowForm,
  SubmitForm,
  UpdateForm,
}) => {
  const {
    _id,
    category,
    parent,
    categoryUrl,
    showInChild,
    metaTitle,
    metaDesc,
    sortOrder,
    menu,
  } = EditForm;

  const handleChange = (e) => {
    setEditForm({ ...EditForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Edit Category</h4>
              </div>
              <div className="card-body">
                <form onSubmit={SubmitForm}>
                  {/* Category */}
                  <div className="col-md-12 pr-1">
                    <div className="form-group">
                      <label>Category</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Category"
                        name="category"
                        value={category}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Parent */}
                  <div className="col-md-12 pr-1">
                    <div className="form-group">
                      <label>Parent</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Parent"
                        name="parent"
                        value={parent}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Category Url */}
                  <div className="col-md-12 pr-1">
                    <div className="form-group">
                      <label>Category Url</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Category Url"
                        name="categoryUrl"
                        value={categoryUrl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Sort Order */}
                  <div className="col-md-12 pr-1">
                    <div className="form-group">
                      <label>Sort Order</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Sort Order"
                        name="sortOrder"
                        value={sortOrder}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* show In Child */}
                  <div className="form-check form-switch form-check-inline form-check-reverse">
                    <strong
                      className="form-check-label"
                      htmlFor="flexSwitchCheckReverse"
                    >
                      Show in Child
                    </strong>
                    <input
                      onClick={handleChange}
                      value={showInChild}
                      name="showInChild"
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckReverse"
                    />
                  </div>
                  {/* Menu */}
                  <div className="col-md-12 pr-1">
                    <div className="form-group">
                      <label>Menu</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Menu"
                        name="menu"
                        value={menu}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Meta Title */}
                  <div className="col-md-12 pr-1">
                    <div className="form-group">
                      <label>Meta Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Meta Title"
                        name="metaTitle"
                        value={metaTitle}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Meta Desc */}
                  <div className="col-md-12 pr-1">
                    <div className="form-group">
                      <label>Meta Description</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Meta Description"
                        name="metaDesc"
                        value={metaDesc}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="row mt-2">
                    <div className="update ml-auto mr-auto">
                      <button
                        type="button"
                        className="btn mx-1 btn-danger btn-round"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn mx-1 btn-primary btn-round"
                      >
                        {UpdateForm ? "Update Category" : "Add Category"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
