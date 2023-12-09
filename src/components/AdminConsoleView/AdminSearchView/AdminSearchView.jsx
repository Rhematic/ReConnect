import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function AdminSearchView() {
  const dispatch = useDispatch();
  const journal = useSelector((state) => state.journal);
  const response = useSelector((state) => state.response);
  const questions = useSelector((state) => state.question);
  const [showJournal, setShowJournal] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [responseDialogContent, setResponseDialogContent] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_JOURNAL" });
    dispatch({ type: "FETCH_RESPONSE" });
    dispatch({ type: "FETCH_QUESTION" });
  }, []);

  const handleViewJournal = () => {
    setShowJournal(!showJournal);
    if (showResponse) {
      setShowResponse(false);
    }
  };

  const handleViewResponse = () => {
    setShowResponse(!showResponse);
    if (showJournal) {
      setShowJournal(false);
    }
  };

  const handleOpenDialog = (content) => {
    setDialogContent(content);
    setIsDialogOpen(true);
  };

  const handleOpenResponseDialog = (content, createdAt) => {
    const sameTimeResponses = response.filter(
      (item) =>
        new Date(item.created_at).toLocaleDateString() ===
        new Date(createdAt).toLocaleDateString()
    );
    setResponseDialogContent(
      sameTimeResponses
        .map((item, index) => {
          const question = questions.find((q) => q.id === item.question_id);
          return `${index + 1}. ${question ? question.detail : ""}<br />${
            item.response
          }<br /><br />`;
        })
        .join("")
    );
    setIsResponseDialogOpen(true);
  };

  const uniqueResponses = response.reduce((acc, current) => {
    const x = acc.find(
      (item) =>
        new Date(item.created_at).toLocaleDateString() ===
        new Date(current.created_at).toLocaleDateString()
    );
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return (
    <div className="container">
      <p>Admin Search View</p>
      <button onClick={handleViewJournal}>View Journals</button>
      <button onClick={handleViewResponse}>View Responses</button>
      <button onClick={() => history.push("/admin")}>Back to Admin Home</button>
      <br />
      <input
        type="text"
        placeholder="Search by name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {showJournal && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {journal
              .filter((item) =>
                `${item.first_name} ${item.last_name}`
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
              )
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.first_name}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleOpenDialog(item.detail)}>
                      View Journal Response
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {showResponse && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {uniqueResponses
              .filter((item) =>
                `${item.first_name} ${item.last_name}`
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
              )
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.first_name}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleOpenResponseDialog(item.response, item.created_at)
                      }
                    >
                      View Emotion Survey Response
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <dialog open={isDialogOpen}>
        <p>{dialogContent}</p>
        <button onClick={() => setIsDialogOpen(false)}>Close</button>
      </dialog>
      <dialog open={isResponseDialogOpen}>
        <p dangerouslySetInnerHTML={{ __html: responseDialogContent }} />
        <button onClick={() => setIsResponseDialogOpen(false)}>Close</button>
      </dialog>
    </div>
  );
}

export default AdminSearchView;
