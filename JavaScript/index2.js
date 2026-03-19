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