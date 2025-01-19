// Header Component Logic
const initHeader = () => {
    const getStartedBtn = document.querySelector('.get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            // Show revenue form modal
            document.getElementById('revenue-form').classList.remove('hidden');
        });
    }
};

export { initHeader }; 