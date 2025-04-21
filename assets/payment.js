document.addEventListener('DOMContentLoaded', function () {
    const paymentRadios = document.querySelectorAll('input[name="payment_method"]');
    const paymentDetailsDiv = document.querySelector('.payment-details');
    const confirmButton = document.getElementById('confirm-payment');

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            showPaymentDetails(this.value);
        });
    });

    confirmButton.addEventListener('click', function () {
        const selectedMethod = document.querySelector('input[name="payment_method"]:checked');
        if (selectedMethod) {
            processPayment(selectedMethod.value);
        } else {
            alert('Please select a payment method.');
        }
    });

    function showPaymentDetails(method) {
        let details = '';
        switch (method) {
            case 'cash':
                details = '<p>Please prepare the exact amount. Cash payment will be collected upon delivery.</p>';
                break;
            case 'gcash':
                details = '<p>GCash Number: 09175815741<br>Please send the payment to the GCash number and provide the reference number.</p>';
                break;
            case 'bank_transfer':
                details = '<p>Bank Name: BDO Savings Account<br>Account Number: 0059-3004-8070<br>Account Name: Clarito De Luna<br>Please send the payment to the bank account and provide the deposit slip or transaction number.</p>';
                break;
        }
        paymentDetailsDiv.innerHTML = details;
    }

    function processPayment(method) {
        alert(`Payment processed via ${method}.`);
    }

    // Redirect to dashboard
    document.getElementById('back-to-dashboard').addEventListener('click', function () {
        window.location.href = 'dashboard/student.html'; // Change this to your actual student dashboard file
    });
});