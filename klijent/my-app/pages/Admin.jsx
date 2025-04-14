import { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // Čuva odgovore po ID-ju
  const [loading, setLoading] = useState(true); // Status učitavanja

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/questions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setQuestions(response.data);
    } catch (error) {
      console.error("Greška pri dohvatanju pitanja:", error);
      alert("Neuspelo učitavanje pitanja");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleAnswerSubmit = async (questionId) => {
    try {
      await axios.put(
        `/api/questions/${questionId}/answer`,
        { answer: answers[questionId] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setAnswers((prev) => ({ ...prev, [questionId]: "" }));
      // Ažuriraj samo odgovarajuće pitanje
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === questionId ? { ...q, answer: answers[questionId] } : q
        )
      );
      alert("Odgovor je uspešno poslat!");
    } catch (error) {
      console.error("Greška pri slanju odgovora:", error);
      alert("Neuspelo slanje odgovora");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin - Odgovori na pitanja</h2>
      {loading ? (
        <p>Učitavanje pitanja...</p>
      ) : questions.length === 0 ? (
        <p>Nema pitanja.</p>
      ) : (
        questions.map((question) => (
          <div key={question._id} className="card mb-3">
            <div className="card-body">
              <p><strong>Korisnik:</strong> {question.userId?.name} ({question.userId?.email})</p>
              <p><strong>Pitanje:</strong> {question.question}</p>
              <p><strong>Trenutni odgovor:</strong> {question.answer || <em>Nema odgovora</em>}</p>

              <textarea
                value={answers[question._id] || ""}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                placeholder="Unesite odgovor"
                rows="3"
                className="form-control mt-2"
              />

              <button
                className="btn btn-primary mt-2"
                onClick={() => handleAnswerSubmit(question._id)}
              >
                Pošalji odgovor
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
