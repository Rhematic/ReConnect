import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AdminQuestions.css";
import { useHistory } from "react-router-dom";

function AdminQuestions() {
  const question = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const optionIdCounter = useRef(0);
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    id: null,
    detail: "",
    hidden: false,
    archived: false,
    type: "",
    options: [],
    deleteOptions: [],
  });

  const [options, setOptions] = useState([]);
  const [deleteOptions, setDeleteOptions] = useState(
    currentQuestion.deleteOptions || []
  );

  useEffect(() => {
    dispatch({ type: "FETCH_QUESTION" });
  }, []);

  function handleOptionChange(id, event) {
    const newOptions = options.map((option) =>
      option.id === id ? { ...option, detail: event.target.value } : option
    );
    setOptions(newOptions);
  }

  function handleOptionDelete(id) {
    const newOptions = options.filter((option) => option.id !== id);
    setOptions(newOptions);

    if (!String(id).startsWith("new-")) {
      setDeleteOptions([...deleteOptions, id]);
    }
  }

  function openModal(question) {
    setCurrentQuestion(
      question || { id: null, detail: "", hidden: false, type: "short" }
    );
    setOptions(question ? question.options : []);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function toggleVisibility(id) {
    dispatch({ type: "UPDATE_QUESTION_VISIBILITY", payload: { id: id } });
  }

  function archiveQuestion(id) {
    if (window.confirm("Are you sure you want to archive this question?")) {
      dispatch({ type: "ARCHIVE_QUESTION", payload: { id: id } });
    }
  }

  function handleSave(e) {
    e.preventDefault();
    if (currentQuestion.id) {
      dispatch({
        type: "UPDATE_QUESTION",
        payload: { ...currentQuestion, options, deleteOptions },
      });
    } else {
      dispatch({
        type: "POST_QUESTION",
        payload: { ...currentQuestion, options },
      });
    }
    closeModal();
  }

  return (
    <div className="container">
      <h2 className="admin-survey-title">ADMIN SURVEY</h2>
      <button className="admin-prompt-btn" onClick={() => openModal()}>Add question</button>
      <button className="admin-prompt-btn" onClick={() => history.push("/admin")}>Back to Admin Home</button>
      
      <div className="prompts-layout">
      <table className="prompts-list">
        {question
          .filter((question) => !question.archived)
          .map((question) => (
            <tr key={question.id}>
              <td>{question.detail}</td>
              <div className="table-btns">
              <button className="question-btn" onClick={() => openModal(question)}>Edit</button>
              <button
              className="question-btn"
                onClick={() => {
                  toggleVisibility(question.id);
                }}
              >
                {question.hidden ? "Hide Question" : "Show Question"}
              </button>
              <button
              className="question-btn"
                onClick={() => {
                  archiveQuestion(question.id);
                }}
              >
                Delete
              </button>
              </div>
            </tr>
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
                Question Text:
                <input
                  type="text"
                  value={currentQuestion.detail}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      detail: e.target.value,
                    })
                  }
                />
              </label>
              <br />
              <label>
                Hidden?:
                <input
                  type="checkbox"
                  checked={currentQuestion.hidden}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      hidden: e.target.checked,
                    })
                  }
                />
              </label>
              <br />
              <label>
                Question Type:
                <select
                  value={currentQuestion.type}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="short">Short Response</option>
                  <option value="single">
                    Multiple Choice - Single Answer
                  </option>
                  <option value="multi">
                    Multiple Choice - Multiple Selection
                  </option>
                </select>
              </label>
              <br />
              {(currentQuestion.type === "single" ||
                currentQuestion.type === "multi") &&
                options.map((option) => (
                  <div key={option.id}>
                    <input
                      type="text"
                      value={option.detail}
                      onChange={(event) => handleOptionChange(option.id, event)}
                    />
                    <button
                      type="button"
                      onClick={() => handleOptionDelete(option.id)}
                    >
                      Delete Option
                    </button>
                    <br />
                  </div>
                ))}
              <br />
              {(currentQuestion.type === "single" ||
                currentQuestion.type === "multi") && (
                <button
                  type="button"
                  onClick={() =>
                    setOptions([
                      ...options,
                      { id: `new-${optionIdCounter.current++}`, detail: "" },
                    ])
                  }
                >
                  Add Option
                </button>
              )}
              <br />
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default AdminQuestions;
