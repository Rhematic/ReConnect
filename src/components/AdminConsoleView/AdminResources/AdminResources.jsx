import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AdminResources.css";
import { useHistory } from "react-router-dom";

function AdminResources() {
  const resource = useSelector((state) => state.resource);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState({
    id: null,
    description: "",
    url: "",
    access_level: "",
  });

  function openModal(resource) {
    setCurrentResource(
      resource || { id: null, description: "", url: "", access_level: "" }
    );
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleDelete(id) {
    dispatch({ type: "DELETE_RESOURCE", payload: id });
  }

  function handleSave(e) {
    e.preventDefault();
    if (currentResource.id) {
      dispatch({ type: "UPDATE_RESOURCE", payload: currentResource });
    } else {
      dispatch({ type: "POST_RESOURCE", payload: currentResource });
    }
    closeModal();
  }

  useEffect(() => {
    dispatch({ type: "FETCH_RESOURCE" });
  }, []);

  return (
    <div className="container">
      <p>Admin Resources</p>
      <ul>
        {resource.map((resource) => (
          <li key={resource.id}>
            {resource.description} - {resource.url} - {resource.access_level}
            <button onClick={() => openModal(resource)}>Edit Resource</button>
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  handleDelete(resource.id);
              }}
            >
              Delete Resource
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => openModal()}>Add Resource</button>
      <button onClick={() => history.push("/admin")}>Back to Admin Home</button>

      {isModalOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSave}>
              <label>
                Description:
                <input
                  type="text"
                  value={currentResource.description}
                  onChange={(e) =>
                    setCurrentResource({
                      ...currentResource,
                      description: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                URL:
                <input
                  type="url"
                  value={currentResource.url}
                  onChange={(e) =>
                    setCurrentResource({
                      ...currentResource,
                      url: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Access Level:
                <select
                  value={currentResource.access_level}
                  onChange={(e) =>
                    setCurrentResource({
                      ...currentResource,
                      access_level: e.target.value,
                    })
                  }
                >
                  <option value="">Select...</option>
                  <option value="parent">Parent</option>
                  <option value="child">Child</option>
                </select>
              </label>
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminResources;
