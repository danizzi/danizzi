const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

const modalTriggers = document.querySelectorAll('[data-open-modal]');
const modalCloseTargets = document.querySelectorAll('[data-close-modal]');
const modals = document.querySelectorAll('[data-modal-id]');

if (modals.length > 0 && modalTriggers.length > 0) {
  const closeModal = (modal) => {
    if (!modal) {
      return;
    }
    modal.classList.remove('is-open');
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openModal = (modalId) => {
    const modal = document.querySelector(`[data-modal-id="${modalId}"]`);
    if (!modal) {
      return;
    }

    modals.forEach((item) => closeModal(item));
    modal.hidden = false;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(trigger.dataset.openModal);
    });
  });

  modalCloseTargets.forEach((target) => {
    target.addEventListener('click', (event) => {
      event.preventDefault();
      closeModal(target.closest('[data-modal-id]'));
    });
  });

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    const openedModal = document.querySelector('[data-modal-id].is-open');
    if (openedModal) {
      closeModal(openedModal);
    }
  });
}