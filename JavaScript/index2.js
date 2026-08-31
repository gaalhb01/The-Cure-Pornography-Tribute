function openModal(imgElement) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    modal.style.display = "flex";
    modalImg.src = imgElement.src.replace("_kicsi", "_nagy");
  }

  function closeModal(event) {
    if(event) event.stopPropagation();
    document.getElementById("modal").style.display = "none";
  }
  const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal-content');
const closeButton = document.querySelector('.close');

document.querySelectorAll('img[data-open-modal="true"]').forEach(img => {
    img.addEventListener('click', () => {
        modalImage.src = img.src;
        modal.classList.add('open');

        document.body.classList.add('modal-open');
    });
});

closeButton.addEventListener('click', () => {
    modal.classList.remove('open');

    document.body.classList.remove('modal-open');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }
});