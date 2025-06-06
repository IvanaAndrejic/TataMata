import { useState, useEffect } from "react";
import axios from "../src/utils/axiosConfig";
import Alert from 'react-bootstrap/Alert';
import Footer from "../components/Footer";
import { cleanupComponentStyles } from '../src/js/styleCleaner'; 

const Admin = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusVariant, setStatusVariant] = useState("success");
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    cleanupComponentStyles([`tm-admin`]); 
    fetchQuestions();

    return () => {
      cleanupComponentStyles([`tm-admin`]); 
    };
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/questions");
      setQuestions(response.data);

      const unreadCount = response.data.filter((q) => !q.answer).length;
      setUnreadMessagesCount(unreadCount); // Ažuriraj broj nepročitanih poruka
    } catch (error) {
      console.error("Greška pri dohvatanju pitanja:", error);
      setStatusMessage("Neuspelo učitavanje pitanja.");
      setStatusVariant("danger");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleAnswerSubmit = async (questionId) => {
    const trimmedAnswer = answers[questionId]?.trim();
    if (!trimmedAnswer) {
      setStatusMessage("Odgovor ne može biti prazan.");
      setStatusVariant("warning");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/questions/${questionId}/answer`,
        { answer: trimmedAnswer }
      );
      setAnswers((prev) => ({ ...prev, [questionId]: "" }));

      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === questionId ? { ...q, answer: trimmedAnswer } : q
        )
      );
      setStatusMessage("Odgovor je uspešno poslat!");
      setStatusVariant("success");
      window.dispatchEvent(new Event("refreshUnreadBadge"));
      setUnreadMessagesCount((prevCount) => prevCount - 1); // Smanji broj nepročitanih poruka za 1
    } catch (error) {
      console.error("Greška pri slanju odgovora:", error);
      setStatusMessage("Neuspelo slanje odgovora.");
      setStatusVariant("danger");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div className="container mt-4 mb-3" style={{ flexGrow: 1 }}>
        <h2 className="admin-q mb-4">Odgovori na pitanja</h2>

        {statusMessage && (
          <div className="custom-alert">
            <Alert
              variant={statusVariant}
              onClose={() => setStatusMessage(null)}
              dismissible
            >
              {statusMessage}
            </Alert>
          </div>
        )}

        {loading ? (
          <p>Učitavanje pitanja...</p>
        ) : questions.length === 0 ? (
          <p>Nema pitanja.</p>
        ) : (
          [...questions]
            .sort((a, b) => (a.answer ? 1 : -1))
            .map((question) => (
              <div key={question._id} className="card mb-3 answer">
                <div className="card-body">
                  <p><strong>Korisnik:</strong> {question.userId?.name} ({question.userId?.email})</p>
                  <p><strong>Pitanje:</strong> {question.question}</p>
                  <p><strong>Odgovor:</strong> {question.answer || <em>Nema odgovora</em>}</p>

                  {!question.answer && (
                    <>
                      <textarea
                        value={answers[question._id] || ""}
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                        placeholder="Unesite odgovor"
                        rows="3"
                        className="form-control mt-2"
                      />
                      <button
                        className="btn btn-warning mt-2"
                        onClick={() => handleAnswerSubmit(question._id)}
                      >
                        Pošalji odgovor
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
        )}
      </div>

      <footer style={{ marginTop: "auto", backgroundColor: "white", padding: "1px 0", textAlign: "center" }}>
        <Footer />
      </footer>

      <style>
        {`
          * {
            box-sizing: border-box; 
          }

          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            min-height: 100%;
            overflow-x: hidden; /* Sprečava horizontalni skrol */
            overflow-y: auto; /* Obezbeđuje vertikalni skrol samo kad je potreban */
          }

          body {
            font-family: "Lexend", sans-serif; 
            background: #f3f4f8;
          }

          .container {
            width: 100%;
            max-width: 100%;
            margin-top: 0.625rem;
            box-shadow: 0 0 0.625rem #FDC840;
            padding: 1.25rem;
            border-radius: 0.5rem;
            background: #fff;
          }

          .card {
            box-shadow: 0 0 0.625rem #0D1E49;
            border: none;
            border-radius: 0.5rem;
          }

          .answer {
            background-color: #f3f4f8;
          }

          .form-control {
            width: 100%;
            height: 6.25rem;
            font-size: 1rem;
            padding: 0.625rem;
            resize: vertical;
          }

          .btn-warning {
            background-color: #fdc840;
            border-color: #fdc840;
            color: black;
            font-weight: bold;
            font-size: 1rem;
          }

          .btn-warning:hover {
            background-color: #e6b734;
            border-color: #e6b734;
          }

          footer {
            color: #0D1E49;
            background: #fff;
          }

          .custom-alert {
            position: fixed;
            top: 1.25rem;
            right: 1.25rem;
            z-index: 9999;
            min-width: 17.5rem;
          }

          .admin-q {
            font-weight: bold;
            color: #0d1e49;
          }

          @media (max-width: 767px) {
            .container {
              padding: 1rem;
              margin-left: 0;
              margin-right: 0;
            }

            .form-control {
              height: auto; 
            }

            .card-body {
              padding: 0.75rem; 
            }

            .btn-warning {
              font-size: 0.875rem; 
            }
          }

          @media (max-width: 430px) {
            html, body {
              overflow-y: auto;
              margin: 0; /* Dodatno se osigurava da nema nepoželjnih margina na malim ekranima */
              padding: 0;
              display: flex;
              justify-content: center; /* Centriraj sadržaj horizontalno */
              align-items: flex-start; /* Poravnaj na vrh */
            }

            .container {
              padding: 0.5rem;
              margin: 0 auto; 
              margin-right: auto;
              width: 100%; /* Obezbeđuje da se kontejner širi uvek na celokupnu širinu ekrana */
              max-width: 100%; /* Obezbeđuje da širina ne izlazi iz okvira */
            }

            .form-control {
              font-size: 0.875rem; 
              width: 100%; 

            }

            .btn-warning {
              font-size: 0.75rem; 
               width: 100%; 
            }

            .card-body {
              padding: 0.5rem; 
            }

            footer {
              font-size: 0.875rem; 
            }
          }
        `}
      </style>
    </div>
  );
};

export default Admin;
