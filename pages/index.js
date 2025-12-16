import { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import "../styles/certificate.css";

export default function Home() {
  const [data, setData] = useState({
    name: "",
    domain: "Frontend Developer",
    duration: "1 Month",
    startDate: "",
    endDate: "",
    candidateId: "",
    template: "classic",
  });

  useEffect(() => {
    const saved = localStorage.getItem("cert");
    if (saved) setData(JSON.parse(saved));
  }, []);

  const change = (e) => {
    const d = { ...data, [e.target.name]: e.target.value };
    setData(d);
    localStorage.setItem("cert", JSON.stringify(d));
  };

  const downloadPDF = () => {
    const element = document.getElementById("certificate");
    html2pdf()
      .set({
        margin: 0,
        filename: `${data.name}_Certificate.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "cm", format: "a4", orientation: "landscape" },
      })
      .from(element)
      .save();
  };

  return (
    <>
      {/* FORM */}
      <div className="form-box">
        <h2>Certificate Generator</h2>

        <input name="name" placeholder="Full Name" onChange={change} />
        <select name="domain" onChange={change}>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Web Developer</option>
          <option>Data Science</option>
        </select>

        <select name="duration" onChange={change}>
          <option>1 Month</option>
          <option>2 Months</option>
        </select>

        <input type="date" name="startDate" onChange={change} />
        <input type="date" name="endDate" onChange={change} />
        <input name="candidateId" placeholder="BS/REG/XXXXX" onChange={change} />

        <select name="template" onChange={change}>
          <option value="classic">Classic (Alfido)</option>
          <option value="modern">Modern Blue</option>
          <option value="gold">Minimal Gold</option>
        </select>

        <button onClick={downloadPDF}>Download PDF</button>
      </div>

      {/* CERTIFICATE */}
      <div id="certificate" className={`certificate ${data.template}`}>
        <img src="/logo.png" className="logo" />

        <h1>CERTIFICATE</h1>
        <h3>OF COMPLETION</h3>

        <p className="small">THIS CERTIFICATE IS PRESENTED TO</p>
        <h2 className="name">{data.name}</h2>
        <p className="from">From Alfido Tech</p>

        <p className="content">
          In recognition of his/her efforts and achievements in completing
          <strong> {data.duration} </strong>
          internship as a
          <strong className="highlight"> {data.domain}</strong>.
        </p>

        <p className="content">
          Conducted From <strong>{data.startDate}</strong> to
          <strong> {data.endDate}</strong>
        </p>

        <div className="bottom">
          <div>
            <p>Candidate ID</p>
            <strong>{data.candidateId}</strong>
          </div>

          <div className="badges">
            <img src="/iso.png" />
            <img src="/msme.png" />
          </div>

          <div className="sign-box">
            <img src="/sign.png" />
            <p>Company CEO</p>
            <img src="/stamp.png" className="stamp" />
          </div>
        </div>
      </div>
    </>
  );
}
