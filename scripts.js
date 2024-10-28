const writeReviewBtn = document.getElementById('writeReviewBtn');
        const reviewModal = document.getElementById('reviewModal');
        const closeBtn = document.querySelector('.close');
        const closeSuccessModalBtn = document.getElementById('closeSuccessModal');
        const ratingForm = document.getElementById('ratingForm');
        const ratingTitle = document.getElementById('ratingTitle');
        const submitBtn = document.getElementById('submitBtn');
        const successModal = document.getElementById('successModal');
        const successMessage = document.getElementById('successMessage');

        // Open modal on button click
        writeReviewBtn.onclick = function() {
            reviewModal.style.display = 'block';
        };

        // Close modal on close button click
        closeBtn.onclick = function() {
            reviewModal.style.display = 'none';
            resetReviewModal();
        };

        // Close modal if clicked outside of modal content
        window.onclick = function(event) {
            if (event.target == reviewModal) {
                reviewModal.style.display = 'none';
                resetReviewModal;
            }
        };

        // Show rating form based on selected type
        document.querySelectorAll('.rating-btn').forEach(button => {
            button.onclick = function() {
                const type = this.getAttribute('data-type');
                ratingTitle.textContent = type === 'service' ? 'Rate the Service' : 'Rate the Product';
                ratingForm.classList.remove('hidden');
            };
        });

        submitBtn.onclick = async function() {
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const comment = commentBox.value;
            const anonymousChecked = anonymous.checked;
        
            // Hide review form and show success message
            ratingForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
        
            // Add review to Firestore
            await addReview(rating, comment, anonymousChecked);
        
            // Optionally: Reset form and show success message
            document.querySelectorAll('.star-rating input').forEach(star => star.checked = false);
            commentBox.value = '';
            anonymous.checked = false;
          };
        closeSuccessModalBtn.onclick = function() {
            successModal.style.display = 'none';
        };


        document.querySelectorAll('.star-rating input').forEach(star => {
            star.addEventListener('change', function() {
                const selectedRating = parseInt(this.value);
                document.querySelectorAll('.star-rating  label').forEach((label, index) => {
                    const starValue = index + 1;
                    label.style.color = starValue <= selectedRating ? 'coral' : '#ddd';
                });
            });
        });

        function resetReviewModal() {
            ratingForm.classList.remove('hidden');
            successMessage.classList.add('hidden'); // Hide success message
        }