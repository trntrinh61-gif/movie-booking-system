// ==================== DATA STORAGE ====================
// Dữ liệu phim mẫu
const moviesData = [
    {
        id: 1,
        title: "Avatar: The Way of Water",
        duration: 192,
        genre: "Hành động, Phiêu lưu",
        description: "Jake Sully sống với gia đình mới của mình trên hành tinh Pandora. Khi một mối đe dọa quen thuộc quay trở lại để hoàn thành những gì đã bắt đầu trước đây, Jake phải làm việc với Neytiri và quân đội của chủng tộc Na'vi để bảo vệ hành tinh của họ.",
        poster: "/image/avatar.jpg",
        trailer: "https://www.youtube.com/embed/d9MyW72ELq0",
        status: "showing",
        rating: 8.5
    },
    {
        id: 2,
        title: "Avengers: Endgame",
        duration: 181,
        genre: "Hành động, Siêu anh hùng",
        description: "Sau những sự kiện tàn khốc của Infinity War, các Avengers tập hợp lần cuối để hoàn tác hành động của Thanos và khôi phục trật tự cho vũ trụ.",
        poster: "/image/endgame.jpg",
        trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
        status: "showing",
        rating: 9.0
    },
    {
        id: 3,
        title: "Spider-Man: No Way Home",
        duration: 148,
        genre: "Hành động, Phiêu lưu",
        description: "Với danh tính Spider-Man giờ đã được tiết lộ, Peter nhờ Doctor Strange giúp đỡ. Khi một phép thuật đi sai hướng, những kẻ thù nguy hiểm từ các thế giới khác bắt đầu xuất hiện.",
        poster: "/image/spiderman.jpg",
        trailer: "https://www.youtube.com/embed/JfVOs4VSpmA",
        status: "showing",
        rating: 8.7
    },
    {
        id: 4,
        title: "The Batman",
        duration: 176,
        genre: "Hành động, Tội phạm",
        description: "Trong năm thứ hai của mình khi chiến đấu với tội phạm, Batman khám phá ra sự tham nhũng ở Gotham City, đồng thời theo dõi Riddler, một kẻ giết người hàng loạt.",
        poster: "/image/batman.jpg",
        trailer: "https://www.youtube.com/embed/mqqft2x_Aa4",
        status: "showing",
        rating: 8.3
    },
    {
        id: 5,
        title: "Top Gun: Maverick",
        duration: 131,
        genre: "Hành động, Chính kịch",
        description: "Sau hơn 30 năm phục vụ, Pete Maverick Mitchell vẫn là một phi công thử nghiệm hàng đầu. Khi anh ta huấn luyện một nhóm sinh viên tốt nghiệp Top Gun cho một nhiệm vụ đặc biệt, Maverick gặp Bradley Bradshaw.",
        poster: "/image/topgun.jpg",
        trailer: "https://www.youtube.com/embed/giXco2jaZ_4",
        status: "showing",
        rating: 8.8
    },
    {
        id: 6,
        title: "Black Panther: Wakanda Forever",
        duration: 161,
        genre: "Hành động, Phiêu lưu",
        description: "Nữ hoàng Ramonda, Shuri, M'Baku, Okoye và Dora Milaje chiến đấu để bảo vệ quốc gia của họ khỏi sự can thiệp của các cường quốc thế giới sau cái chết của Vua T'Challa.",
        poster: "/image/blackpanther.jpg",
        trailer: "https://www.youtube.com/embed/_Z3QKkl1WyM",
        status: "coming",
        rating: 8.1
    },
    {
        id: 7,
        title: "Doctor Strange: Multiverse of Madness",
        duration: 126,
        genre: "Hành động, Phiêu lưu",
        description: "Doctor Strange đối mặt với những hậu quả nguy hiểm của việc mở ra đa vũ trụ và phải đối đầu với một mối đe dọa mới khủng khiếp.",
        poster: "/image/doctorstrange.jpg",
        trailer: "https://www.youtube.com/embed/aWzlQ2N6qqg",
        status: "coming",
        rating: 7.8
    },
    {
        id: 8,
        title: "Guardians of the Galaxy Vol. 3",
        duration: 150,
        genre: "Hành động, Phiêu lưu",
        description: "Peter Quill vẫn đang chịu đựng sự mất mát của Gamora và phải tập hợp đội của mình để bảo vệ vũ trụ cùng với việc bảo vệ một trong những thành viên của họ.",
        poster: "/image/guardian.jpg",
        trailer: "https://www.youtube.com/embed/u3V5KDHRQvk",
        status: "coming",
        rating: 8.4
    }
];

// Dữ liệu rạp chiếu
const cinemas = [
    { id: 1, name: "CGV Vincom Center", location: "Quận 1" },
    { id: 2, name: "CGV Crescent Mall", location: "Quận 7" },
    { id: 3, name: "Lotte Cinema Cộng Hòa", location: "Quận Tân Bình" },
    { id: 4, name: "Galaxy Nguyễn Du", location: "Quận 1" },
    { id: 5, name: "BHD Star Vincom", location: "Quận Bình Thạnh" }
];

// Dữ liệu suất chiếu
const showtimes = ["09:00", "11:30", "14:00", "16:30", "19:00", "21:30"];

// Giá vé
const TICKET_PRICE = 80000;

// ==================== STATE MANAGEMENT ====================
let currentUser = null;
let currentMovie = null;
let bookingData = {
    movie: null,
    cinema: null,
    date: null,
    showtime: null,
    seats: [],
    totalPrice: 0
};
let selectedPaymentMethod = null;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập
    checkLoginStatus();
    
    // Khởi tạo reviews
    initializeReviews();
    
    // Render phim
    renderMovies();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize demo account
    initializeDemoAccount();
});

// ==================== USER AUTHENTICATION ====================
// Kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUIForLoggedInUser();
    }
}

// Cập nhật UI cho người dùng đã đăng nhập
function updateUIForLoggedInUser() {
    const userBtn = document.getElementById('userBtn');
    if (currentUser) {
        userBtn.innerHTML = `<i class="bi bi-person-check-fill"></i>`;
        userBtn.title = currentUser.name;
    }
}

// Xử lý đăng ký
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const birthday = document.getElementById('registerBirthday').value;
    
    // Lấy danh sách tài khoản
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    
    // Kiểm tra số điện thoại đã tồn tại
    if (accounts.find(acc => acc.phone === phone)) {
        showNotification('Số điện thoại đã tồn tại, không thể tạo tài khoản mới.', 'error');
        return;
    }
    
    // Lưu tài khoản mới
    const newAccount = { name, phone, password, birthday };
    accounts.push(newAccount);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    
    showNotification('Đăng ký thành công!', 'success');
    closeModal('registerModal');
    
    // Reset form
    document.getElementById('registerForm').reset();
});

// Xử lý đăng nhập
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('loginPhone').value;
    const password = document.getElementById('loginPassword').value;
    
    // Lấy danh sách tài khoản
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    
    // Kiểm tra thông tin đăng nhập
    const account = accounts.find(acc => acc.phone === phone && acc.password === password);
    
    if (account) {
        currentUser = account;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        showNotification('Đăng nhập thành công!', 'success');
        closeModal('loginModal');
        document.getElementById('loginForm').reset();
    } else {
        showNotification('Số điện thoại hoặc mật khẩu không đúng!', 'error');
    }
});

// Chuyển đổi giữa form đăng nhập và đăng ký
function switchToRegister(e) {
    e.preventDefault();
    closeModal('loginModal');
    openModal('registerModal');
}

function switchToLogin(e) {
    e.preventDefault();
    closeModal('registerModal');
    openModal('loginModal');
}

// Đăng xuất
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('userBtn').innerHTML = '<i class="bi bi-person-circle"></i>';
    document.getElementById('userBtn').title = 'Tài khoản';
    showNotification('Đã đăng xuất!', 'success');
    navigateTo('home');
}

// ==================== NAVIGATION ====================
function setupEventListeners() {
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateTo(page);
        });
    });
    
    // Search button
    document.getElementById('searchBtn').addEventListener('click', toggleSearch);
    document.getElementById('closeSearchBtn').addEventListener('click', toggleSearch);
    
    // Search input
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // User button
    document.getElementById('userBtn').addEventListener('click', handleUserButton);
    
    // Mobile menu
    document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
    
    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
}

// Điều hướng trang
function navigateTo(page) {
    // Update active link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === page) {
            link.classList.add('active');
        }
    });
    
    // Show page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    switch(page) {
        case 'home':
            document.getElementById('homePage').classList.add('active');
            break;
        case 'now-showing':
            document.getElementById('nowShowingPage').classList.add('active');
            renderNowShowingMovies();
            break;
        case 'coming-soon':
            document.getElementById('comingSoonPage').classList.add('active');
            renderComingSoonMovies();
            break;
        case 'history':
            document.getElementById('historyPage').classList.add('active');
            renderHistory();
            break;
    }
    
    // Close mobile menu
    document.getElementById('navMenu').classList.remove('active');
}

// Toggle mobile menu
function toggleMobileMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// ==================== SEARCH ====================
function toggleSearch() {
    document.getElementById('searchBar').classList.toggle('active');
    if (document.getElementById('searchBar').classList.contains('active')) {
        document.getElementById('searchInput').focus();
    } else {
        document.getElementById('searchInput').value = '';
        renderMovies();
    }
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const filtered = moviesData.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query)
    );
    
    const grid = document.getElementById('homeMoviesGrid');
    if (filtered.length > 0) {
        renderMoviesInGrid(grid, filtered);
    } else {
        grid.innerHTML = '<div class="empty-state"><p>Không tìm thấy phim phù hợp</p></div>';
    }
}

// ==================== MOVIES RENDERING ====================
function renderMovies() {
    const homeGrid = document.getElementById('homeMoviesGrid');
    renderMoviesInGrid(homeGrid, moviesData.slice(0, 6));
}

function renderNowShowingMovies() {
    const grid = document.getElementById('nowShowingGrid');
    const nowShowing = moviesData.filter(m => m.status === 'showing');
    renderMoviesInGrid(grid, nowShowing);
}

function renderComingSoonMovies() {
    const grid = document.getElementById('comingSoonGrid');
    const comingSoon = moviesData.filter(m => m.status === 'coming');
    renderMoviesInGrid(grid, comingSoon);
}

function renderMoviesInGrid(grid, movies) {
    grid.innerHTML = movies.map(movie => `
        <div class="movie-card" onclick="showMovieDetails(${movie.id})">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" 
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'300\\'%3E%3Crect fill=\\'%231a1a1a\\' width=\\'200\\' height=\\'300\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' fill=\\'%23666\\' font-size=\\'16\\' text-anchor=\\'middle\\' dy=\\'.3em\\'%3E${movie.title}%3C/text%3E%3C/svg%3E'">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-duration">
                        <i class="bi bi-clock"></i> ${movie.duration} phút
                    </span>
                    <span class="movie-status ${movie.status}">
                        ${movie.status === 'showing' ? 'Đang chiếu' : 'Sắp chiếu'}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== MOVIE DETAILS ====================
function showMovieDetails(movieId) {
    const movie = moviesData.find(m => m.id === movieId);
    if (!movie) return;
    
    currentMovie = movie;
    
    // Cập nhật rating từ reviews
    updateMovieRating(movieId);
    
    const detailsHTML = `
        <div class="movie-detail-container">
            <div class="movie-detail-header">
                <img src="${movie.poster}" alt="${movie.title}" class="movie-detail-poster"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'300\\'%3E%3Crect fill=\\'%231a1a1a\\' width=\\'200\\' height=\\'300\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' fill=\\'%23666\\' font-size=\\'16\\' text-anchor=\\'middle\\' dy=\\'.3em\\'%3E${movie.title}%3C/text%3E%3C/svg%3E'">
                <div class="movie-detail-info">
                    <h2>${movie.title}</h2>
                    <div class="movie-detail-meta">
                        <span><i class="bi bi-clock"></i> ${movie.duration} phút</span>
                        <span><i class="bi bi-tags"></i> ${movie.genre}</span>
                        <span><i class="bi bi-star-fill"></i> ${movie.rating}/10 ${movie.reviewCount ? `(${movie.reviewCount} đánh giá)` : ''}</span>
                    </div>
                    <p class="movie-detail-description">${movie.description}</p>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        ${movie.status === 'showing' ? 
                            '<button class="btn btn-primary" onclick="startBooking()"><i class="bi bi-ticket-perforated"></i> Đặt vé ngay</button>' :
                            '<button class="btn btn-outline" disabled><i class="bi bi-calendar"></i> Sắp chiếu</button>'
                        }
                        <button class="btn btn-secondary" onclick="openReviewModal(${movie.id})">
                            <i class="bi bi-star"></i> Đánh giá phim
                        </button>
                    </div>
                </div>
            </div>
            <div class="movie-trailer">
                <iframe src="${movie.trailer}" allowfullscreen></iframe>
            </div>
            ${renderMovieReviews(movieId)}
        </div>
    `;
    
    document.getElementById('movieDetails').innerHTML = detailsHTML;
    openModal('movieModal');
}

// ==================== BOOKING ====================
function startBooking() {
    if (!currentUser) {
        closeModal('movieModal');
        openModal('loginModal');
        showNotification('Vui lòng đăng nhập để đặt vé!', 'warning');
        return;
    }
    
    if (!currentMovie) return;
    
    bookingData = {
        movie: currentMovie,
        cinema: null,
        date: null,
        showtime: null,
        seats: [],
        totalPrice: 0
    };
    
    closeModal('movieModal');
    renderBookingForm();
    openModal('bookingModal');
}

function renderBookingForm() {
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const maxDate = nextWeek.toISOString().split('T')[0];
    
    const bookingHTML = `
        <div class="booking-step">
            <h3><i class="bi bi-1-circle"></i> Chọn rạp chiếu</h3>
            <div class="cinema-list">
                ${cinemas.map(cinema => `
                    <div class="cinema-item" onclick="selectCinema(${cinema.id})">
                        <strong>${cinema.name}</strong>
                        <p>${cinema.location}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="booking-step">
            <h3><i class="bi bi-2-circle"></i> Chọn ngày chiếu</h3>
            <div class="form-group">
                <input type="date" id="bookingDate" min="${today}" max="${maxDate}" 
                       onchange="selectDate(this.value)">
            </div>
        </div>
        
        <div class="booking-step" id="showtimeStep" style="display:none;">
            <h3><i class="bi bi-3-circle"></i> Chọn suất chiếu</h3>
            <div class="showtime-list" id="showtimeList"></div>
        </div>
        
        <div class="booking-step" id="seatStep" style="display:none;">
            <h3><i class="bi bi-4-circle"></i> Chọn ghế ngồi</h3>
            <div class="seat-map">
                <div class="screen">MÀN HÌNH</div>
                <div class="seats-grid" id="seatsGrid"></div>
                <div class="seat-legend">
                    <div class="legend-item">
                        <div class="legend-box available"></div>
                        <span>Ghế trống</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box occupied"></div>
                        <span>Đã đặt</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box selected"></div>
                        <span>Ghế chọn</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="booking-summary" id="bookingSummary" style="display:none;">
            <h3><i class="bi bi-receipt"></i> Thông tin đặt vé</h3>
            <div class="summary-row">
                <span>Phim:</span>
                <strong>${currentMovie.title}</strong>
            </div>
            <div class="summary-row" id="cinemaInfo" style="display:none;">
                <span>Rạp:</span>
                <strong id="cinemaName"></strong>
            </div>
            <div class="summary-row" id="dateInfo" style="display:none;">
                <span>Ngày chiếu:</span>
                <strong id="dateValue"></strong>
            </div>
            <div class="summary-row" id="showtimeInfo" style="display:none;">
                <span>Suất chiếu:</span>
                <strong id="showtimeValue"></strong>
            </div>
            <div class="summary-row" id="seatsInfo" style="display:none;">
                <span>Ghế ngồi:</span>
                <strong id="seatsValue"></strong>
            </div>
            <div class="summary-row">
                <span>Tổng tiền:</span>
                <strong id="totalPrice">0đ</strong>
            </div>
            <button class="btn btn-primary" id="paymentBtn" style="width:100%; margin-top: 1rem;" 
                    onclick="proceedToPayment()" disabled>
                <i class="bi bi-credit-card"></i> Thanh toán
            </button>
        </div>
    `;
    
    document.getElementById('bookingContent').innerHTML = bookingHTML;
}

function selectCinema(cinemaId) {
    const cinema = cinemas.find(c => c.id === cinemaId);
    bookingData.cinema = cinema;
    
    document.querySelectorAll('.cinema-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.target.closest('.cinema-item').classList.add('selected');
    
    document.getElementById('cinemaInfo').style.display = 'flex';
    document.getElementById('cinemaName').textContent = cinema.name;
    document.getElementById('bookingSummary').style.display = 'block';
    
    updatePaymentButton();
}

function selectDate(date) {
    bookingData.date = date;
    
    document.getElementById('dateInfo').style.display = 'flex';
    document.getElementById('dateValue').textContent = new Date(date).toLocaleDateString('vi-VN');
    
    // Show showtime selection
    const showtimeStep = document.getElementById('showtimeStep');
    showtimeStep.style.display = 'block';
    
    const showtimeList = document.getElementById('showtimeList');
    showtimeList.innerHTML = showtimes.map(time => `
        <div class="showtime-item" onclick="selectShowtime('${time}')">
            <i class="bi bi-clock"></i>
            <strong>${time}</strong>
        </div>
    `).join('');
    
    updatePaymentButton();
}

function selectShowtime(time) {
    bookingData.showtime = time;
    
    document.querySelectorAll('.showtime-item').forEach(item => {
        item.classList.remove('selected');
    });
    event.target.closest('.showtime-item').classList.add('selected');
    
    document.getElementById('showtimeInfo').style.display = 'flex';
    document.getElementById('showtimeValue').textContent = time;
    
    // Show seat selection
    document.getElementById('seatStep').style.display = 'block';
    renderSeats();
    
    updatePaymentButton();
}

function renderSeats() {
    const seatsGrid = document.getElementById('seatsGrid');
    const rows = 8;
    const cols = 10;
    const occupiedSeats = generateRandomOccupiedSeats(rows * cols);
    
    let seatsHTML = '';
    for (let i = 0; i < rows * cols; i++) {
        const row = String.fromCharCode(65 + Math.floor(i / cols));
        const col = (i % cols) + 1;
        const seatId = `${row}${col}`;
        const isOccupied = occupiedSeats.includes(i);
        
        seatsHTML += `
            <div class="seat ${isOccupied ? 'occupied' : ''}" 
                 data-seat="${seatId}" 
                 onclick="toggleSeat('${seatId}', ${isOccupied})">
                ${seatId}
            </div>
        `;
    }
    
    seatsGrid.innerHTML = seatsHTML;
}

function generateRandomOccupiedSeats(total) {
    const occupied = [];
    const count = Math.floor(Math.random() * 20) + 10;
    for (let i = 0; i < count; i++) {
        const seat = Math.floor(Math.random() * total);
        if (!occupied.includes(seat)) {
            occupied.push(seat);
        }
    }
    return occupied;
}

function toggleSeat(seatId, isOccupied) {
    if (isOccupied) return;
    
    const seatElement = event.target;
    seatElement.classList.toggle('selected');
    
    if (seatElement.classList.contains('selected')) {
        bookingData.seats.push(seatId);
    } else {
        bookingData.seats = bookingData.seats.filter(s => s !== seatId);
    }
    
    updateBookingSummary();
}

function updateBookingSummary() {
    if (bookingData.seats.length > 0) {
        document.getElementById('seatsInfo').style.display = 'flex';
        document.getElementById('seatsValue').textContent = bookingData.seats.join(', ');
        
        bookingData.totalPrice = bookingData.seats.length * TICKET_PRICE;
        document.getElementById('totalPrice').textContent = 
            bookingData.totalPrice.toLocaleString('vi-VN') + 'đ';
    } else {
        document.getElementById('seatsInfo').style.display = 'none';
        bookingData.totalPrice = 0;
        document.getElementById('totalPrice').textContent = '0đ';
    }
    
    updatePaymentButton();
}

function updatePaymentButton() {
    const btn = document.getElementById('paymentBtn');
    if (btn && bookingData.cinema && bookingData.date && bookingData.showtime && bookingData.seats.length > 0) {
        btn.disabled = false;
    } else if (btn) {
        btn.disabled = true;
    }
}

// ==================== PAYMENT ====================
function proceedToPayment() {
    closeModal('bookingModal');
    renderPaymentForm();
    openModal('paymentModal');
}

function renderPaymentForm() {
    const paymentHTML = `
        <div class="booking-summary" style="margin-bottom: 1.5rem;">
            <div class="summary-row">
                <span>Phim:</span>
                <strong>${bookingData.movie.title}</strong>
            </div>
            <div class="summary-row">
                <span>Rạp:</span>
                <strong>${bookingData.cinema.name}</strong>
            </div>
            <div class="summary-row">
                <span>Ngày - Giờ:</span>
                <strong>${new Date(bookingData.date).toLocaleDateString('vi-VN')} - ${bookingData.showtime}</strong>
            </div>
            <div class="summary-row">
                <span>Ghế:</span>
                <strong>${bookingData.seats.join(', ')}</strong>
            </div>
            <div class="summary-row">
                <span>Tổng tiền:</span>
                <strong style="color: var(--secondary-color)">${bookingData.totalPrice.toLocaleString('vi-VN')}đ</strong>
            </div>
        </div>
        
        <h3 style="margin-bottom: 1rem;"><i class="bi bi-credit-card"></i> Chọn phương thức thanh toán</h3>
        <div class="payment-methods">
            <div class="payment-method" onclick="selectPaymentMethod('momo')">
                <div class="payment-icon" style="color: #A50064;">
                    <i class="bi bi-wallet2"></i>
                </div>
                <div class="payment-info">
                    <h4>Ví MoMo</h4>
                    <p>Thanh toán qua ví điện tử MoMo</p>
                </div>
            </div>
            <div class="payment-method" onclick="selectPaymentMethod('bank')">
                <div class="payment-icon" style="color: #0066CC;">
                    <i class="bi bi-bank"></i>
                </div>
                <div class="payment-info">
                    <h4>Ngân hàng nội địa</h4>
                    <p>Chuyển khoản qua tài khoản ngân hàng</p>
                </div>
            </div>
        </div>
        
        <button class="btn btn-primary" id="confirmPaymentBtn" style="width:100%;" onclick="processPayment()" disabled>
            <i class="bi bi-check-circle"></i> Xác nhận thanh toán
        </button>
    `;
    
    document.getElementById('paymentContent').innerHTML = paymentHTML;
}

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    document.querySelectorAll('.payment-method').forEach(item => {
        item.classList.remove('selected');
    });
    event.target.closest('.payment-method').classList.add('selected');
    
    document.getElementById('confirmPaymentBtn').disabled = false;
}

function processPayment() {
    if (!selectedPaymentMethod) return;
    
    // Tạo mã vé
    const ticketId = 'TK' + Date.now();
    
    // Lưu thông tin vé vào localStorage
    const ticket = {
        id: ticketId,
        user: currentUser.name,
        movie: bookingData.movie.title,
        cinema: bookingData.cinema.name,
        date: bookingData.date,
        showtime: bookingData.showtime,
        seats: bookingData.seats,
        totalPrice: bookingData.totalPrice,
        paymentMethod: selectedPaymentMethod === 'momo' ? 'Ví MoMo' : 'Ngân hàng',
        bookingDate: new Date().toISOString()
    };
    
    // Lấy danh sách vé cũ
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    tickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    
    // Hiển thị vé
    closeModal('paymentModal');
    showTicket(ticket);
}

// ==================== TICKET ====================
function showTicket(ticket) {
    const ticketHTML = `
        <div class="ticket-container">
            <div class="ticket-header">
                <h2>VÉ XEM PHIM</h2>
                <div class="ticket-success">
                    <i class="bi bi-check-circle-fill"></i>
                    Đặt vé thành công!
                </div>
            </div>
            
            <div class="ticket-details">
                <div class="ticket-row">
                    <span class="ticket-label">Mã vé:</span>
                    <span class="ticket-value">${ticket.id}</span>
                </div>
                <div class="ticket-row">
                    <span class="ticket-label">Khách hàng:</span>
                    <span class="ticket-value">${ticket.user}</span>
                </div>
                <div class="ticket-row">
                    <span class="ticket-label">Phim:</span>
                    <span class="ticket-value">${ticket.movie}</span>
                </div>
                <div class="ticket-row">
                    <span class="ticket-label">Rạp:</span>
                    <span class="ticket-value">${ticket.cinema}</span>
                </div>
                <div class="ticket-row">
                    <span class="ticket-label">Ngày chiếu:</span>
                    <span class="ticket-value">${new Date(ticket.date).toLocaleDateString('vi-VN')}</span>
                </div>
                <div class="ticket-row">
                    <span class="ticket-label">Suất chiếu:</span>
                    <span class="ticket-value">${ticket.showtime}</span>
                </div>
                <div class="ticket-row">
                    <span class="ticket-label">Ghế ngồi:</span>
                    <span class="ticket-value">${ticket.seats.join(', ')}</span>
                </div>
                <div class="ticket-row">
                    <span class="ticket-label">Tổng tiền:</span>
                    <span class="ticket-value" style="color: var(--secondary-color); font-size: 1.2rem;">
                        ${ticket.totalPrice.toLocaleString('vi-VN')}đ
                    </span>
                </div>
            </div>
            
            <div class="ticket-qr">
                <img src="/image/qrcode.png" alt="QR Code" 
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'200\\'%3E%3Crect fill=\\'%23fff\\' width=\\'200\\' height=\\'200\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' fill=\\'%23000\\' font-size=\\'16\\' text-anchor=\\'middle\\' dy=\\'.3em\\'%3EQR CODE%3C/text%3E%3C/svg%3E'">
            </div>
            
            <div class="ticket-footer">
                <p><i class="bi bi-info-circle"></i> Vui lòng xuất trình mã QR này tại quầy để nhận vé</p>
                <p>Cảm ơn quý khách đã sử dụng dịch vụ của CineMax!</p>
            </div>
            
            <button class="btn btn-primary" style="width:100%; margin-top: 1rem;" onclick="closeTicketAndGoHome()">
                <i class="bi bi-house-door"></i> Về trang chủ
            </button>
        </div>
    `;
    
    document.getElementById('ticketContent').innerHTML = ticketHTML;
    openModal('ticketModal');
    
    showNotification('Đặt vé thành công! Kiểm tra lịch sử để xem vé.', 'success');
}

function closeTicketAndGoHome() {
    closeModal('ticketModal');
    navigateTo('home');
}

// ==================== HISTORY ====================
function renderHistory() {
    if (!currentUser) {
        document.getElementById('historyContent').innerHTML = `
            <div class="empty-state">
                <i class="bi bi-person-x"></i>
                <h3>Chưa đăng nhập</h3>
                <p>Vui lòng đăng nhập để xem lịch sử đặt vé</p>
                <button class="btn btn-primary" onclick="openModal('loginModal')">
                    <i class="bi bi-box-arrow-in-right"></i> Đăng nhập
                </button>
            </div>
        `;
        return;
    }
    
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const userTickets = tickets.filter(t => t.user === currentUser.name);
    
    if (userTickets.length === 0) {
        document.getElementById('historyContent').innerHTML = `
            <div class="empty-state">
                <i class="bi bi-ticket-perforated"></i>
                <h3>Chưa có lịch sử đặt vé</h3>
                <p>Bạn chưa đặt vé xem phim nào. Hãy khám phá và đặt vé ngay!</p>
                <button class="btn btn-primary" onclick="navigateTo('now-showing')">
                    <i class="bi bi-film"></i> Xem phim đang chiếu
                </button>
            </div>
        `;
        return;
    }
    
    // Sắp xếp theo ngày đặt vé mới nhất
    userTickets.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
    
    const historyHTML = userTickets.map(ticket => `
        <div class="history-item">
            <div class="history-header">
                <div class="history-movie">${ticket.movie}</div>
                <div class="history-date">
                    <i class="bi bi-calendar"></i>
                    ${new Date(ticket.bookingDate).toLocaleDateString('vi-VN')}
                </div>
            </div>
            <div class="history-details">
                <div class="history-detail-item">
                    <i class="bi bi-building"></i>
                    <span>${ticket.cinema}</span>
                </div>
                <div class="history-detail-item">
                    <i class="bi bi-calendar-event"></i>
                    <span>${new Date(ticket.date).toLocaleDateString('vi-VN')}</span>
                </div>
                <div class="history-detail-item">
                    <i class="bi bi-clock"></i>
                    <span>${ticket.showtime}</span>
                </div>
                <div class="history-detail-item">
                    <i class="bi bi-tv"></i>
                    <span>Ghế: ${ticket.seats.join(', ')}</span>
                </div>
                <div class="history-detail-item">
                    <i class="bi bi-cash"></i>
                    <span style="color: var(--secondary-color); font-weight: 600;">
                        ${ticket.totalPrice.toLocaleString('vi-VN')}đ
                    </span>
                </div>
                <div class="history-detail-item">
                    <i class="bi bi-credit-card"></i>
                    <span>${ticket.paymentMethod}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('historyContent').innerHTML = historyHTML;
}

// ==================== USER BUTTON ====================
function handleUserButton() {
    if (currentUser) {
        // Show user menu
        const shouldLogout = confirm(`Xin chào ${currentUser.name}!\n\nBạn có muốn đăng xuất không?`);
        if (shouldLogout) {
            logout();
        }
    } else {
        // Show login modal
        openModal('loginModal');
    }
}

// ==================== REVIEW SYSTEM ====================
// Khởi tạo reviews
function initializeReviews() {
    if (!localStorage.getItem('movieReviews')) {
        localStorage.setItem('movieReviews', JSON.stringify([]));
    }
}

// Hiển thị modal đánh giá phim
function openReviewModal(movieId) {
    if (!currentUser) {
        showNotification('Vui lòng đăng nhập để đánh giá phim!', 'warning');
        openModal('loginModal');
        return;
    }
    
    const movie = moviesData.find(m => m.id === movieId);
    if (!movie) return;
    
    currentMovie = movie;
    
    // Kiểm tra xem người dùng đã đánh giá phim này chưa
    const reviews = JSON.parse(localStorage.getItem('movieReviews') || '[]');
    const existingReview = reviews.find(r => r.movieId === movieId && r.userId === currentUser.phone);
    
    const reviewFormHTML = `
        <div class="review-form-container">
            <h3><i class="bi bi-star-fill"></i> Đánh giá phim: ${movie.title}</h3>
            
            <form id="reviewForm" class="form">
                <div class="form-group">
                    <label>Đánh giá của bạn</label>
                    <div class="star-rating" id="starRating">
                        ${[1, 2, 3, 4, 5].map(star => `
                            <i class="bi bi-star star-icon" data-rating="${star}" onclick="selectRating(${star})"></i>
                        `).join('')}
                    </div>
                    <input type="hidden" id="ratingValue" value="${existingReview ? existingReview.rating : 0}" required>
                </div>
                
                <div class="form-group">
                    <label><i class="bi bi-chat-left-text"></i> Nhận xét của bạn</label>
                    <textarea id="reviewComment" rows="4" placeholder="Chia sẻ cảm nhận của bạn về bộ phim..." required>${existingReview ? existingReview.comment : ''}</textarea>
                </div>
                
                <button type="submit" class="btn btn-primary">
                    <i class="bi bi-send"></i> ${existingReview ? 'Cập nhật đánh giá' : 'Gửi đánh giá'}
                </button>
            </form>
        </div>
    `;
    
    document.getElementById('reviewModalContent').innerHTML = reviewFormHTML;
    
    // Hiển thị rating hiện tại nếu có
    if (existingReview) {
        updateStarDisplay(existingReview.rating);
    }
    
    openModal('reviewModal');
    
    // Setup form submit
    document.getElementById('reviewForm').addEventListener('submit', submitReview);
}

// Chọn số sao
function selectRating(rating) {
    document.getElementById('ratingValue').value = rating;
    updateStarDisplay(rating);
}

// Cập nhật hiển thị sao
function updateStarDisplay(rating) {
    const stars = document.querySelectorAll('.star-icon');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('bi-star');
            star.classList.add('bi-star-fill');
            star.style.color = '#ffc107';
        } else {
            star.classList.remove('bi-star-fill');
            star.classList.add('bi-star');
            star.style.color = '#b3b3b3';
        }
    });
}

// Gửi đánh giá
function submitReview(e) {
    e.preventDefault();
    
    const rating = parseInt(document.getElementById('ratingValue').value);
    const comment = document.getElementById('reviewComment').value.trim();
    
    if (rating === 0) {
        showNotification('Vui lòng chọn số sao đánh giá!', 'warning');
        return;
    }
    
    if (!comment) {
        showNotification('Vui lòng viết nhận xét của bạn!', 'warning');
        return;
    }
    
    // Lấy danh sách reviews
    const reviews = JSON.parse(localStorage.getItem('movieReviews') || '[]');
    
    // Tìm review cũ (nếu có)
    const existingIndex = reviews.findIndex(r => 
        r.movieId === currentMovie.id && r.userId === currentUser.phone
    );
    
    const review = {
        id: existingIndex >= 0 ? reviews[existingIndex].id : 'RV' + Date.now(),
        movieId: currentMovie.id,
        movieTitle: currentMovie.title,
        userId: currentUser.phone,
        userName: currentUser.name,
        rating: rating,
        comment: comment,
        date: new Date().toISOString()
    };
    
    if (existingIndex >= 0) {
        // Cập nhật review cũ
        reviews[existingIndex] = review;
        showNotification('Cập nhật đánh giá thành công!', 'success');
    } else {
        // Thêm review mới
        reviews.push(review);
        showNotification('Gửi đánh giá thành công!', 'success');
    }
    
    // Lưu vào localStorage
    localStorage.setItem('movieReviews', JSON.stringify(reviews));
    
    // Đóng modal và cập nhật rating phim
    closeModal('reviewModal');
    updateMovieRating(currentMovie.id);
    
    // Nếu đang ở trang chi tiết phim, reload reviews
    if (document.getElementById('movieModal').classList.contains('active')) {
        showMovieDetails(currentMovie.id);
    }
}

// Cập nhật rating trung bình của phim
function updateMovieRating(movieId) {
    const reviews = JSON.parse(localStorage.getItem('movieReviews') || '[]');
    const movieReviews = reviews.filter(r => r.movieId === movieId);
    
    if (movieReviews.length > 0) {
        const avgRating = movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length;
        const movie = moviesData.find(m => m.id === movieId);
        if (movie) {
            movie.rating = parseFloat(avgRating.toFixed(1));
            movie.reviewCount = movieReviews.length;
        }
    }
}

// Hiển thị danh sách reviews trong chi tiết phim
function renderMovieReviews(movieId) {
    const reviews = JSON.parse(localStorage.getItem('movieReviews') || '[]');
    const movieReviews = reviews.filter(r => r.movieId === movieId);
    
    // Sắp xếp theo ngày mới nhất
    movieReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (movieReviews.length === 0) {
        return `
            <div class="reviews-section">
                <h3><i class="bi bi-chat-left-text"></i> Đánh giá từ khán giả</h3>
                <div class="empty-state" style="padding: 2rem;">
                    <i class="bi bi-chat-left-dots" style="font-size: 3rem; opacity: 0.3;"></i>
                    <p>Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá phim này!</p>
                </div>
            </div>
        `;
    }
    
    const avgRating = movieReviews.reduce((sum, r) => sum + r.rating, 0) / movieReviews.length;
    
    return `
        <div class="reviews-section">
            <div class="reviews-header">
                <h3><i class="bi bi-chat-left-text"></i> Đánh giá từ khán giả</h3>
                <div class="reviews-summary">
                    <div class="avg-rating">
                        <span class="rating-number">${avgRating.toFixed(1)}</span>
                        <div class="rating-stars">
                            ${renderStars(avgRating)}
                        </div>
                        <span class="rating-count">(${movieReviews.length} đánh giá)</span>
                    </div>
                </div>
            </div>
            
            <div class="reviews-list">
                ${movieReviews.map(review => `
                    <div class="review-item">
                        <div class="review-header">
                            <div class="review-user">
                                <i class="bi bi-person-circle"></i>
                                <strong>${review.userName}</strong>
                            </div>
                            <div class="review-rating">
                                ${renderStars(review.rating)}
                            </div>
                        </div>
                        <div class="review-comment">${review.comment}</div>
                        <div class="review-date">
                            <i class="bi bi-clock"></i>
                            ${new Date(review.date).toLocaleDateString('vi-VN', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                        ${review.userId === currentUser?.phone ? `
                            <div class="review-actions">
                                <button class="btn-edit-review" onclick="openReviewModal(${movieId})">
                                    <i class="bi bi-pencil"></i> Chỉnh sửa
                                </button>
                                <button class="btn-delete-review" onclick="deleteReview('${review.id}', ${movieId})">
                                    <i class="bi bi-trash"></i> Xóa
                                </button>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Render stars helper
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="bi bi-star-fill"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="bi bi-star-half"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="bi bi-star"></i>';
    }
    
    return starsHTML;
}

// Xóa review
function deleteReview(reviewId, movieId) {
    if (!confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
        return;
    }
    
    const reviews = JSON.parse(localStorage.getItem('movieReviews') || '[]');
    const filteredReviews = reviews.filter(r => r.id !== reviewId);
    
    localStorage.setItem('movieReviews', JSON.stringify(filteredReviews));
    showNotification('Đã xóa đánh giá!', 'success');
    
    updateMovieRating(movieId);
    showMovieDetails(movieId);
}

// ==================== MODAL FUNCTIONS ====================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ==================== NOTIFICATION ====================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    const icon = type === 'success' ? 'check-circle-fill' : 
                 type === 'error' ? 'x-circle-fill' : 
                 type === 'warning' ? 'exclamation-triangle-fill' : 
                 'info-circle-fill';
    
    notification.innerHTML = `
        <i class="bi bi-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add animation style
    if (!document.getElementById('notificationStyle')) {
        const style = document.createElement('style');
        style.id = 'notificationStyle';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==================== UTILITY FUNCTIONS ====================
// Format currency
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('vi-VN');
}

// Generate random ID
function generateId() {
    return 'ID' + Date.now() + Math.random().toString(36).substr(2, 9);
}

// ==================== INITIALIZATION ====================
// Initialize demo account
function initializeDemoAccount() {
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    if (accounts.length === 0) {
        const demoAccount = {
            name: 'Người dùng Demo',
            phone: '0123456789',
            password: '123456',
            birthday: '1990-01-01'
        };
        localStorage.setItem('accounts', JSON.stringify([demoAccount]));
        console.log('✅ Tài khoản demo đã được tạo:');
        console.log('   📱 SĐT: 0123456789');
        console.log('   🔐 Mật khẩu: 123456');
    }
}