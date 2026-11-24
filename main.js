
        // =========================================================================
        //    : ضع رقم الواتساب الخاص بك هنا بصيغة دولية بدون + أو أصفار في البداية
        // مثال لليمن: 967770000000
        // =========================================================================
        const OWNER_WHATSAPP_NUMBER = "967774567217";

        // 1. دالة معالجة بديل الشعار في حال فتح الملف بدون وجود الصورة في نفس المجلد
        function handleLogoError(imgElement) {
            const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23090D16"/><circle cx="60" cy="60" r="52" fill="none" stroke="%23F5B82E" stroke-width="3"/><text x="60" y="67" font-family="Arial, sans-serif" font-weight="bold" font-size="28" fill="%2300D2FF" text-anchor="middle">RW</text></svg>`;
            imgElement.onerror = null;
            imgElement.src = fallbackSvg;
        }

        // 2. التحكم في قائمة الجوال المنسدلة
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');

        mobileToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });

        // إغلاق القائمة عند النقر على أي رابط في الجوال
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
            });
        });

        // 3. اختيار الباقة تلقائياً والتمرير إلى نموذج الحجز
        function selectPackage(packageName) {
            const selectElement = document.getElementById('packageSelect');
            selectElement.value = packageName;

            const bookingSection = document.getElementById('booking');
            bookingSection.scrollIntoView({ behavior: 'smooth' });

            setTimeout(function () {
                document.getElementById('breederName').focus();
            }, 600);
        }

        // 4. إرسال بيانات نموذج الحجز إلى الواتساب
        const bookingForm = document.getElementById('bookingForm');
        const formStatus = document.getElementById('formStatus');

        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('breederName').value.trim();
            const city = document.getElementById('breederCity').value.trim();
            const birds = document.getElementById('birdType').value.trim();
            const selectedPlan = document.getElementById('packageSelect').value;
            const notes = document.getElementById('breederNotes').value.trim() || "لا توجد ملاحظات إضافية";

            const whatsappMessage =
`السلام عليكم ورحمة الله وبركاته أخ قتيبة 🦜
أرغب بالاشتراك في خدمات *Rainbow Wings* للمتابعة والاستشارة:

👤 *اسم المربي:* ${name}
📍 *المدينة / المنطقة:* ${city}
🐦 *نوع الطيور والعدد:* ${birds}
📦 *الباقة المختارة:* ${selectedPlan}
📝 *ملاحظات إضافية:* ${notes}

بانتظار تواصلكم لتأكيد الاشتراك.`;

            formStatus.style.display = 'block';

            const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        });


        // تفعيل نظام التقييم بالنجوم وإضافة التعليقات
const stars = document.querySelectorAll('#starRating span');
const ratingInput = document.getElementById('ratingValue');
const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviewsList');

// اختيار عدد النجوم عند النقر
stars.forEach((star) => {
  star.addEventListener('click', () => {
    const val = star.getAttribute('data-value');
    ratingInput.value = val;

    stars.forEach((s) => {
      if (parseInt(s.getAttribute('data-value')) <= parseInt(val)) {
        s.classList.add('selected');
      } else {
        s.classList.remove('selected');
      }
    });
  });
});

// دالة لإنشاء بطاقة تقييم وإضافتها للصفحة
function renderReviewCard(name, birds, rating, comment) {
  const starsText = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML = `
    <div class="review-card-top">
      <div class="reviewer-info">
        <strong>${name}</strong>
        <span>${birds || 'مربي طيور زينة'}</span>
      </div>
      <div class="review-stars-display">${starsText}</div>
    </div>
    <p class="review-text">${comment}</p>
  `;
  reviewsList.prepend(card);
}

// تحميل التقييمات المحفوظة في المتصفح عند فتح الصفحة
const savedReviews = JSON.parse(localStorage.getItem('rainbowWingsReviews') || '[]');
savedReviews.forEach((rev) => {
  renderReviewCard(rev.name, rev.birds, rev.rating, rev.comment);
});

// معالجة إرسال تقييم جديد
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('reviewerName').value.trim();
  const birds = document.getElementById('reviewerBirds').value.trim();
  const rating = parseInt(ratingInput.value);
  const comment = document.getElementById('reviewComment').value.trim();

  if (!name || !comment) return;

  // عرض التقييم فوراً في القائمة
  renderReviewCard(name, birds, rating, comment);

  // حفظ التقييم في localStorage
  savedReviews.push({ name, birds, rating, comment });
  localStorage.setItem('rainbowWingsReviews', JSON.stringify(savedReviews));

  // إعادة تعيين الحقول
  reviewForm.reset();
  ratingInput.value = 5;
  stars.forEach((s) => s.classList.add('selected'));
  alert('شكراً لك! تم نشر تقييمك بنجاح.');
});


        // تفعيل فتح وإغلاق الأسئلة الشائعة (Accordion)
document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    // إغلاق أي سؤال مفتوح آخر ليبقى التصميم مرتباً
    document.querySelectorAll('.faq-item').forEach((item) => {
      item.classList.remove('active');
    });

    // فتح السؤال الحالي إذا لم يكن مفتوحاً
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});


