import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AdminPrompts.css";
import { useHistory } from "react-router-dom";

function AdminPrompts() {
  const prompt = useSelector((state) => state.prompt);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPrompt, setcurrentPrompt] = useState({
    id: null,
    detail: "",
    hidden: false,
  });

  function openModal(prompt) {
    setcurrentPrompt(prompt || { id: null, detail: "", hidden: false });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function toggleVisibility(id) {
    dispatch({ type: "UPDATE_PROMPT_VISIBILITY", payload: { id: id } });
  }

  function handleSave(e) {
    e.preventDefault();
    if (currentPrompt.id) {
      dispatch({ type: "UPDATE_PROMPT", payload: currentPrompt });
    } else {
      dispatch({ type: "POST_PROMPT", payload: currentPrompt });
    }
    closeModal();
  }

  useEffect(() => {
    dispatch({ type: "FETCH_PROMPT" });
  }, []);

  return (
    <div className="container">
      <h2 className="prompt-title">ADMIN PROMPTS</h2>
      <button className="admin-prompt-btn" onClick={() => history.push("/admin")}>Back to Admin Home</button>
      <button className="admin-prompt-btn" onClick={() => openModal()}>Add prompt</button>

      <div className="prompts-layout">
        <table className="prompts-list">
          {prompt.map((prompt) => (
            <>
              <tr key={prompt.id}>
                <td>{prompt.detail}</td>
                <td>
                  <div className="table-btns">
                    <button className="prompt-btn" onClick={() => openModal(prompt)}>Edit</button>
                    <button
                      className="prompt-btn"
                      onClick={() => {
                        toggleVisibility(prompt.id);
                      }}
                    >
                      {prompt.hidden ? "Show Question" : "Hide Question"}
                    </button>
                  </div>
                </td>

              </tr>
            </>
          ))}
        </table>
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
                    value={currentPrompt.detail}
                    onChange={(e) =>
                      setcurrentPrompt({
                        ...currentPrompt,
                        detail: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Hidden?:
                  <input
                    type="checkbox"
                    checked={currentPrompt.hidden}
                    onChange={(e) =>
                      setcurrentPrompt({
                        ...currentPrompt,
                        hidden: e.target.checked,
                      })
                    }
                  />
                </label>
                <input type="submit" value="Save" />
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPrompts;
