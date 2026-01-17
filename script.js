const subjectFields = document.getElementById("subjectFields");
const cgpaValue = document.getElementById("cgpaValue");

function getGrade(m) {
  if (m >= 90) return ["O",10];
  if (m >= 80) return ["A+",9];
  if (m >= 70) return ["A",8];
  if (m >= 60) return ["B+",7];
  if (m >= 50) return ["B",6];
  if (m >= 45) return ["C",5];
  if (m >= 40) return ["D",4];
  return ["F",0];
}

/* Add subject – clone first row */
document.getElementById("addSubject").onclick = () => {
  const firstRow = document.querySelector(".subject-row");
  const newRow = firstRow.cloneNode(true);

  newRow.querySelectorAll("input").forEach(input => input.value = "");
  newRow.querySelector(".grade-preview").textContent = "—";

  subjectFields.appendChild(newRow);
};

/* Live grade preview */
subjectFields.addEventListener("input", e => {
  if (e.target.type === "number" && e.target.placeholder.includes("Marks")) {
    const preview = e.target.parentElement.querySelector(".grade-preview");
    const [g, p] = getGrade(+e.target.value);
    preview.textContent = `${g} (${p})`;
  }
});

/* Remove subject (keep at least one row) */
subjectFields.addEventListener("click", e => {
  if (e.target.classList.contains("remove")) {
    if (document.querySelectorAll(".subject-row").length === 1) return;
    e.target.parentElement.remove();
  }
});

/* Calculate CGPA */
document.getElementById("calculate").onclick = () => {
  let totalCredits = 0;
  let totalPoints = 0;

  document.querySelectorAll(".subject-row").forEach(row => {
    const credits = +row.children[1].value;
    const marks = +row.children[2].value;

    if (!credits || marks === "") return;

    const [, points] = getGrade(marks);
    totalCredits += credits;
    totalPoints += points * credits;
  });

  if (totalCredits === 0) return;

  cgpaValue.textContent = (totalPoints / totalCredits).toFixed(2);
};
