import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

function AdminSearchView() {
  const dispatch = useDispatch();
  const journal = useSelector((state) => state.journal);
  const response = useSelector((state) => state.response);
  const [showJournal, setShowJournal] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [responseDialogContent, setResponseDialogContent] = useState("");
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_JOURNAL" });
    dispatch({ type: "FETCH_RESPONSE" });
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

  const handleOpenResponseDialog = (content) => {
    setResponseDialogContent(content);
    setIsResponseDialogOpen(true);
  };

  return (
    <div className="container">
      <p>Admin Search View</p>
      <button onClick={handleViewJournal}>View Journals</button>
      <button onClick={handleViewResponse}>View Responses</button>
      <button onClick={() => history.push("/admin")}>Back to Admin Home</button>

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
            {journal.map((item) => (
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
            {response.map((item) => (
              <tr key={item.id}>
                <td>{item.first_name}</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleOpenResponseDialog(item.detail)}>
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
        <p>{responseDialogContent}</p>
        <button onClick={() => setIsResponseDialogOpen(false)}>Close</button>
      </dialog>
    </div>
  );
}

export default AdminSearchView;
