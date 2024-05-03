const cardsPerPage = 20;
let cardCount = 0;

function createCard(imageUrl, title, downloadUrl) {
  if (cardCount >= cardsPerPage) {
    console.log("Maximum card limit reached.");
    return;
  }

  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${imageUrl}" alt="${title}">
    <h3 style="text-align: left;">${title}</h3>
    <button onclick="downloadFile('${downloadUrl}')">View Notes</button>
  `;
  document.getElementById('card-container').appendChild(card);
  cardCount++;
}

function downloadFile(fileUrl) {
  window.open(fileUrl, '_blank');
}

function createPagination(currentPage, totalPages) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement('a');
    if (i === 1) {
      link.href = "https://www.jeeneetards.com";
    } else {
      link.href = `https://www.jeeneetards.com/page=${i}`;
    }
    link.innerText = i;
    if (i === currentPage) {
      link.classList.add('active');
    }
    paginationContainer.appendChild(link);
  }
}

function highlightPageNumber(pageNumber) {
  const links = document.querySelectorAll('#pagination a');
  links.forEach((link, index) => {
    if (index + 1 === pageNumber) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

createCard("https://img.youtube.com/vi/Wf0_XUsAId8/mqdefault.jpg", "NEET 2024 Last Mistake - Zaroor Dekhein", "https://drive.usercontent.google.com/u/0/uc?id=1RauiN8gN5erdE6lDBOYruzTZ4LfMOK0O&export=download");
// Additional card creation calls...