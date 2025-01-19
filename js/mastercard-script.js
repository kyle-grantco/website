document.addEventListener('DOMContentLoaded', function() {
    // Video completion tracking
    let videoWatched = false;
    const videoElement = document.querySelector('.video-container iframe');
    
    // Show email popup after video
    videoElement.addEventListener('ended', () => {
        if (!videoWatched) {
            document.getElementById('email-popup').classList.remove('hidden');
            videoWatched = true;
        }
    });

    // Email form submission
    const emailForm = document.getElementById('email-form');
    emailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        console.log('Attempting to save email:', email);

        // Save to Supabase
        try {
            const { data, error } = await supabase
                .from('mastercard_leads')
                .insert([{ email: email }]);

            if (error) {
                console.error('Supabase error:', error);
                alert('Error saving email. Please try again.');
                return;
            }

            console.log('Successfully saved email:', data);
            alert('Thank you! Check your email for insights.');
            document.getElementById('email-popup').classList.add('hidden');
            
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    });

    // Revenue form handling
    const getStartedBtns = document.querySelectorAll('.get-started-btn');
    getStartedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('revenue-form').classList.remove('hidden');
        });
    });

    document.querySelectorAll('.revenue-btn').forEach(button => {
        button.addEventListener('click', () => {
            const revenue = button.dataset.revenue;
            document.getElementById('revenue-form').classList.add('hidden');
            
            if (['500k-2m', '2m-20m', '20m+'].includes(revenue)) {
                const redirect = document.getElementById('booking-redirect');
                redirect.classList.remove('hidden');
                setTimeout(() => {
                    window.location.href = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0PbUQYydwGG5Wo2AjLrZZhQuAFdbjyMlU-9d96c6rDXFatBC6cNFzKc1tqObeKtJiqDKVu5ghg';
                }, 1000);
            } else {
                document.getElementById('newsletter-signup').classList.remove('hidden');
            }
        });
    });

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });

    // Exit popup functionality
    let hasShownExitPopup = false;
    
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !hasShownExitPopup) {  // User moving mouse up to close
            const exitPopup = document.getElementById('exit-popup');
            exitPopup.classList.remove('hidden');
            hasShownExitPopup = true;
        }
    });

    // Close button functionality
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        document.getElementById('exit-popup').classList.add('hidden');
    });

    // Close on outside click (like other modals)
    document.getElementById('exit-popup').addEventListener('click', (e) => {
        if (e.target === document.getElementById('exit-popup')) {
            e.target.classList.add('hidden');
        }
    });

    // Insider insights button
    const insiderBtn = document.querySelector('.insider-btn');
    insiderBtn.addEventListener('click', () => {
        document.getElementById('insider-form').classList.remove('hidden');
    });

    // Revenue selection for insider insights
    document.querySelectorAll('.insider-revenue-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('insider-form').classList.add('hidden');
            document.getElementById('insider-email-form').classList.remove('hidden');
        });
    });

    // Insider email form submission
    const insiderEmailForm = document.getElementById('insider-email-submit');
    insiderEmailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('insider-email').value;
        
        try {
            // First save to Supabase
            const { data: dbData, error: dbError } = await supabase
                .from('mastercard_leads')
                .insert([{ email: email }]);

            if (dbError && dbError.code !== '23505') { // Ignore duplicate email errors
                console.error('Database error:', dbError);
                throw new Error('Failed to save email');
            }

            // Then send email
            const response = await fetch('https://ndvgbjnvevheuyearoja.supabase.co/functions/v1/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${supabaseKey}`  // Just use supabaseKey
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            console.log('Response:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send email');
            }

            alert('Thank you! Check your email for insights.');
            document.getElementById('insider-email-form').classList.add('hidden');
            
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    });
});
