/* ==========================================================================
   GLOBETROTTER — CORE APPLICATION ENGINE (JS)
   ========================================================================== */

// --- 1. LOCAL DATA STORE (RELATIONAL DATA MODEL) ---
const DEFAULT_DB = {
  users: {
    id: "user_sarah",
    name: "Sarah Jenkins",
    email: "sarah.j@globetrotter.io",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    interests: ["Culture", "Food", "Adventure"],
    travelStyle: "Balanced",
    savedDestinations: ["paris", "rome", "tokyo"]
  },
  
  cities: {
    paris: { id: "paris", name: "Paris", country: "France", rating: 4.8, costIndex: 3, popularity: 9.8, img: "/manus-storage/paris-rome-corridor_fef25fc1.png" },
    rome: { id: "rome", name: "Rome", country: "Italy", rating: 4.9, costIndex: 2, popularity: 9.6, img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80" },
    florence: { id: "florence", name: "Florence", country: "Italy", rating: 4.7, costIndex: 2, popularity: 9.2, img: "/manus-storage/florence-discovery_2cb08a47.png" },
    barcelona: { id: "barcelona", name: "Barcelona", country: "Spain", rating: 4.8, costIndex: 2, popularity: 9.5, img: "https://images.unsplash.com/photo-1583422409516-2915074ebd21?auto=format&fit=crop&w=600&q=80" },
    tokyo: { id: "tokyo", name: "Tokyo", country: "Japan", rating: 4.9, costIndex: 3, popularity: 9.9, img: "/manus-storage/tokyo-discovery_4628bc6b.png" },
    london: { id: "london", name: "London", country: "UK", rating: 4.6, costIndex: 3, popularity: 9.7, img: "https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=600&q=80" }
  },
  
  activities: [
    // PARIS ACTIVITIES
    { id: "act_eiffel", cityId: "paris", name: "Eiffel Tower Climb", category: "Culture", duration: 2, cost: 1500, rating: 4.8, img: "https://images.unsplash.com/photo-1543349689-9a4d426bee87?auto=format&fit=crop&w=400&q=80", description: "Climb the iconic tower for unparalleled panoramic views of Paris." },
    { id: "act_louvre", cityId: "paris", name: "Louvre Guided Tour", category: "Culture", duration: 3, cost: 2000, rating: 4.7, img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80", description: "Skip the lines and explore masterpieces like the Mona Lisa with an art historian." },
    { id: "act_seine", cityId: "paris", name: "Seine River Cruise", category: "Culture", duration: 1.5, cost: 1800, rating: 4.6, img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80", description: "Enjoy a relaxing evening cruise with audio commentary and illuminated monuments." },
    { id: "act_bakery", cityId: "paris", name: "Croissant Baking Masterclass", category: "Food", duration: 2, cost: 3500, rating: 4.9, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80", description: "Learn secrets of French pastry from a professional Parisian baker." },
    { id: "act_montmartre", cityId: "paris", name: "Montmartre & Sacré-Cœur Stroll", category: "Culture", duration: 2.5, cost: 500, rating: 4.7, img: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=400&q=80", description: "Explore the bohemian art history of Montmartre and step inside the white dome." },
    { id: "act_catacombs", cityId: "paris", name: "Paris Catacombs Expedition", category: "Adventure", duration: 2, cost: 2200, rating: 4.5, img: "https://images.unsplash.com/photo-1590076214660-84cf05c6d32c?auto=format&fit=crop&w=400&q=80", description: "Journey into the subterranean ossuary containing the remains of six million people." },
    { id: "act_pastry_walk", cityId: "paris", name: "French Pastry Tasting Walk", category: "Food", duration: 2, cost: 1200, rating: 4.8, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80", description: "A lower-cost walking tour visiting three local artisan boulangeries for tastings." },
    
    // ROME ACTIVITIES
    { id: "act_colosseum", cityId: "rome", name: "Colosseum & Forum Express", category: "Culture", duration: 3, cost: 2200, rating: 4.9, img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80", description: "Walk in the footsteps of gladiators with fast-track entry into the amphitheater." },
    { id: "act_vatican", cityId: "rome", name: "Vatican Museums & Sistine", category: "Culture", duration: 4, cost: 2500, rating: 4.8, img: "https://images.unsplash.com/photo-1542820229-081e0c12af0b?auto=format&fit=crop&w=400&q=80", description: "Witness Michelangelo's masterpiece and the treasures of the papal collection." },
    { id: "act_food_tour", cityId: "rome", name: "Trastevere Food Tour", category: "Food", duration: 3, cost: 4000, rating: 4.9, img: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=400&q=80", description: "Savor 10 food tastings including authentic carbonara and artisanal gelato." },
    { id: "act_trevi", cityId: "rome", name: "Trevi & Pantheon Walk", category: "Culture", duration: 2, cost: 0, rating: 4.8, img: "https://images.unsplash.com/photo-1529260830199-4455210982ba?auto=format&fit=crop&w=400&q=80", description: "Stroll through Rome's historic center, toss a coin in Trevi, and see the ancient dome." },
    { id: "act_pasta_class", cityId: "rome", name: "Handmade Pasta & Tiramisu", category: "Food", duration: 3, cost: 3800, rating: 4.9, img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80", description: "Mix, roll, and shape your own pasta guided by a local Roman chef in their home." },
    { id: "act_villa_bike", cityId: "rome", name: "Villa Borghese Bike Rental", category: "Nature", duration: 2, cost: 800, rating: 4.6, img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80", description: "Cycle through Rome's most beautiful landscape park and check out the lake temple." },
    { id: "act_street_food", cityId: "rome", name: "Rome Street Food Walk", category: "Food", duration: 2, cost: 1500, rating: 4.7, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80", description: "Taste local suppli and pizza al taglio in the Jewish Ghetto at a budget price." },
    
    // FLORENCE ACTIVITIES
    { id: "act_uffizi", cityId: "florence", name: "Uffizi Gallery Masterpieces", category: "Culture", duration: 3, cost: 2400, rating: 4.8, img: "https://images.unsplash.com/photo-1601961405399-801fb1f34581?auto=format&fit=crop&w=400&q=80", description: "See Botticelli's Birth of Venus and Renaissance masterworks." },
    { id: "act_duomo", cityId: "florence", name: "Duomo Dome Climb", category: "Adventure", duration: 2, cost: 1800, rating: 4.9, img: "https://images.unsplash.com/photo-1528114039593-4366cc08227d?auto=format&fit=crop&w=400&q=80", description: "Climb Brunelleschi's magnificent dome for stunning views." }
  ],
  
  trips: [
    {
      id: "trip_europe_adventure",
      name: "Europe Adventure",
      startDate: "2026-09-10",
      endDate: "2026-09-15",
      daysCount: 6,
      budget: 60000,
      description: "An incredible journey exploring the history, art, and delicious culinary scenes of Paris and Rome.",
      coverImg: "/manus-storage/paris-rome-corridor_fef25fc1.png",
      travelStyle: "Balanced",
      interests: ["Culture", "Food", "Adventure"],
      isPublic: true,
      stats: {
        views: 342,
        likes: 89
      },
      // Fixed base costs
      transportCost: 15000,
      accommodationCost: 25000,
      foodCost: 12000
    }
  ],
  
  trip_stops: [
    { id: "stop_1", tripId: "trip_europe_adventure", cityId: "paris", days: [1, 2] },
    { id: "stop_2", tripId: "trip_europe_adventure", cityId: "rome", days: [3, 4, 5, 6] }
  ],
  
  trip_activities: [
    // Day 1 - Paris
    { id: "ta_1", stopId: "stop_1", activityId: "act_eiffel", day: 1, startTime: "10:00" },
    // Introducing tight schedule conflict: Louvre starts at 14:00 (ends 17:00), Seine starts at 17:20 (20m gap, triggers warning)
    { id: "ta_2", stopId: "stop_1", activityId: "act_louvre", day: 1, startTime: "14:00" },
    { id: "ta_3", stopId: "stop_1", activityId: "act_seine", day: 1, startTime: "17:20" },
    
    // Day 2 - Paris
    { id: "ta_4", stopId: "stop_1", activityId: "act_bakery", day: 2, startTime: "10:00" },
    { id: "ta_5", stopId: "stop_1", activityId: "act_montmartre", day: 2, startTime: "14:30" },
    
    // Day 3 - Rome (morning transit, afternoon activities)
    { id: "ta_6", stopId: "stop_2", activityId: "act_colosseum", day: 3, startTime: "14:00" },
    // Introducing time overlap conflict: Vatican Museums starts at 16:30 (4 hrs duration, ends 20:30)
    // but Colosseum is 3 hrs starting at 14:00 (ends 17:00). Vatican overlaps by 30 mins!
    { id: "ta_7", stopId: "stop_2", activityId: "act_vatican", day: 3, startTime: "16:30" },
    
    // Day 4 - Rome
    { id: "ta_8", stopId: "stop_2", activityId: "act_trevi", day: 4, startTime: "10:00" },
    { id: "ta_9", stopId: "stop_2", activityId: "act_pasta_class", day: 4, startTime: "13:00" },
    { id: "ta_10", stopId: "stop_2", activityId: "act_food_tour", day: 4, startTime: "19:00" },
    
    // Day 5 - Rome
    { id: "ta_11", stopId: "stop_2", activityId: "act_villa_bike", day: 5, startTime: "11:00" }
  ]
};

// Database helper functions
const db = {
  init: () => {
    if (!localStorage.getItem("globetrotter_db")) {
      localStorage.setItem("globetrotter_db", JSON.stringify(DEFAULT_DB));
    }
  },
  get: () => {
    return JSON.parse(localStorage.getItem("globetrotter_db"));
  },
  save: (data) => {
    localStorage.setItem("globetrotter_db", JSON.stringify(data));
    window.GlobeTrotterSync?.persist(data);
  },
  reset: () => {
    db.save(DEFAULT_DB);
    window.location.reload();
  }
};

// Initialize DB
db.init();
window.GlobeTrotterDB = {
  get: db.get,
  replace: (data) => localStorage.setItem("globetrotter_db", JSON.stringify(data))
};

// --- 2. GLOBAL ROUTER & VIEW MANAGER ---
const router = {
  routes: {},
  
  add: (route, handler) => {
    router.routes[route] = handler;
  },
  
  resolve: () => {
    const isLoggedIn = localStorage.getItem("globetrotter_logged_in") === "true";
    let hash = window.location.hash || "#dashboard";
    
    // Redirect logic if not authenticated
    if (!isLoggedIn) {
      if (hash !== "#login" && hash !== "#register" && !hash.startsWith("#public/")) {
        window.location.hash = "#login";
        return;
      }
    } else {
      if (hash === "#login" || hash === "#register") {
        window.location.hash = "#dashboard";
        return;
      }
    }

    // Toggle layout container auth mode class
    const appContainer = document.getElementById("app-container");
    if (appContainer) {
      if (hash === "#login" || hash === "#register") {
        appContainer.classList.add("auth-mode");
      } else {
        appContainer.classList.remove("auth-mode");
      }
    }
    
    // De-activate all sidebar nav links
    document.querySelectorAll(".sidebar-nav a, .mobile-nav a").forEach(link => {
      link.classList.remove("active");
    });
    
    // Match direct routes
    if (router.routes[hash]) {
      // Find corresponding view name and activate nav links
      const viewName = hash.replace("#", "");
      document.querySelectorAll(`[data-view="${viewName}"]`).forEach(el => el.classList.add("active"));
      router.routes[hash]();
      return;
    }
    
    // Match dynamic routes (e.g. #itinerary/trip_europe_adventure)
    for (const route in router.routes) {
      if (route.includes("/:id")) {
        const routePrefix = route.split("/:id")[0];
        if (hash.startsWith(routePrefix + "/")) {
          const id = hash.replace(routePrefix + "/", "");
          router.routes[route](id);
          return;
        }
      }
    }
    
    // Default fallback
    window.location.hash = "#dashboard";
  },
  
  init: () => {
    window.addEventListener("hashchange", router.resolve);
    window.addEventListener("load", router.resolve);
  }
};
window.router = router;

// --- 3. TOAST NOTIFICATION SYSTEM ---
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "fa-check-circle";
  if (type === "warning") icon = "fa-exclamation-triangle";
  if (type === "error") icon = "fa-times-circle";
  
  toast.innerHTML = `
    <i class="fa-solid ${icon} toast-icon"></i>
    <span class="toast-message">${message}</span>
    <button class="toast-close"><i class="fa-solid fa-xmark"></i></button>
  `;
  
  container.appendChild(toast);
  
  // Close button action
  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.style.transform = "translateX(100%)";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  });
  
  // Auto-remove after 4 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.transform = "translateX(100%)";
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// --- 4. DIALOG & MODAL CONTROLLER ---
function openModal(title, bodyHtml, footerHtml) {
  const backdrop = document.getElementById("modal-backdrop");
  const container = document.getElementById("modal-container");
  
  container.innerHTML = `
    <div class="modal-header">
      <h3>${title}</h3>
      <button class="modal-close-btn" id="modal-close-x"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="modal-body">
      ${bodyHtml}
    </div>
    <div class="modal-footer">
      ${footerHtml}
    </div>
  `;
  
  backdrop.classList.remove("hidden");
  container.classList.remove("hidden");
  
  // Close actions
  const close = () => {
    backdrop.classList.add("hidden");
    container.classList.add("hidden");
  };
  
  document.getElementById("modal-close-x").addEventListener("click", close);
  backdrop.addEventListener("click", close);
  
  // Return closer
  return close;
}

// Close active modal manually
function closeModal() {
  document.getElementById("modal-backdrop").classList.add("hidden");
  document.getElementById("modal-container").classList.add("hidden");
}

// Drawer Controller (Mobile search details, activity discovery details)
function openDrawer(bodyHtml) {
  const backdrop = document.getElementById("modal-backdrop");
  const drawer = document.getElementById("drawer-container");
  
  drawer.innerHTML = `
    <div style="padding:16px; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
      <h4 style="font-weight:700;">Details</h4>
      <button id="drawer-close-btn" style="background:none; border:none; font-size:1.2rem; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div style="padding:20px; overflow-y:auto; height:calc(100% - 53px);">
      ${bodyHtml}
    </div>
  `;
  
  backdrop.classList.remove("hidden");
  drawer.classList.remove("hidden");
  
  const close = () => {
    backdrop.classList.add("hidden");
    drawer.classList.add("hidden");
  };
  
  document.getElementById("drawer-close-btn").addEventListener("click", close);
  backdrop.addEventListener("click", close);
}

// --- 5. DYNAMIC CALENDAR ENGINE UTILITIES ---
function getMonthData(year, month) {
  const firstDayIndex = new Date(year, month, 1).getDay(); // Day of week (0-6)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const calendarDays = [];
  
  // Fill leading empty days from previous month
  const startDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Align to Monday
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      month: month - 1,
      isOtherMonth: true
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      month: month,
      isOtherMonth: false
    });
  }
  
  // Trailing days from next month to complete 42 days grid
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({
      day: i,
      month: month + 1,
      isOtherMonth: true
    });
  }
  
  return calendarDays;
}

// --- 6. CONFLICT DETECTION ENGINE ---
function checkConflicts(trip) {
  const data = db.get();
  const stops = data.trip_stops.filter(s => s.tripId === trip.id);
  const stopIds = stops.map(s => s.id);
  const tActivities = data.trip_activities.filter(ta => stopIds.includes(ta.stopId));
  
  const conflicts = [];
  
  // 1. Budget check
  const calculated = calculateTripCost(trip.id);
  if (calculated.total > trip.budget) {
    conflicts.push({
      type: "budget",
      severity: "warning",
      message: `Your trip is ₹${(calculated.total - trip.budget).toLocaleString()} over budget.`
    });
  }
  
  // Day-based checks
  for (let day = 1; day <= trip.daysCount; day++) {
    const dayActs = tActivities.filter(ta => ta.day === day);
    
    // Sort chronologically by start time
    dayActs.sort((a, b) => a.startTime.localeCompare(b.startTime));
    
    // 2. Too many activities check
    if (dayActs.length > 4) {
      conflicts.push({
        type: "count",
        severity: "warning",
        day: day,
        message: `Day ${day} has too many activities (${dayActs.length}). Consider moving some to keep it relaxing.`
      });
    }
    
    // Check overlaps & gaps between consecutive items
    for (let i = 0; i < dayActs.length - 1; i++) {
      const act1 = dayActs[i];
      const act2 = dayActs[i + 1];
      
      const details1 = data.activities.find(a => a.id === act1.activityId);
      const details2 = data.activities.find(a => a.id === act2.activityId);
      
      if (!details1 || !details2) continue;
      
      const [h1, m1] = act1.startTime.split(":").map(Number);
      const [h2, m2] = act2.startTime.split(":").map(Number);
      
      const start1 = h1 * 60 + m1;
      const end1 = start1 + details1.duration * 60;
      
      const start2 = h2 * 60 + m2;
      
      // 3. Time Overlap check
      if (start2 < end1) {
        conflicts.push({
          type: "overlap",
          severity: "error",
          day: day,
          act1: act1.id,
          act2: act2.id,
          message: `${details1.name} overlaps with ${details2.name} on Day ${day}.`
        });
      } else {
        // 4. Tight Travel Gap check (< 30 minutes)
        const gap = start2 - end1;
        if (gap < 30) {
          conflicts.push({
            type: "gap",
            severity: "warning",
            day: day,
            gap: gap,
            act1: act1.id,
            act2: act2.id,
            message: `${gap} minutes between ${details1.name} and ${details2.name} on Day ${day} may not be enough.`
          });
        }
      }
    }
  }
  
  return conflicts;
}

// Automatically resolve scheduling conflicts (shifts times forward/comfortably)
function fixTripSchedule(tripId) {
  const data = db.get();
  const trip = data.trips.find(t => t.id === tripId);
  const stops = data.trip_stops.filter(s => s.tripId === tripId);
  const stopIds = stops.map(s => s.id);
  const tActivities = data.trip_activities.filter(ta => stopIds.includes(ta.stopId));
  
  let fixesCount = 0;
  
  // Group activities by day
  for (let day = 1; day <= trip.daysCount; day++) {
    const dayActs = tActivities.filter(ta => ta.day === day);
    dayActs.sort((a, b) => a.startTime.localeCompare(b.startTime));
    
    let currentEndTime = 0; // minutes from midnight
    
    for (let i = 0; i < dayActs.length; i++) {
      const ta = dayActs[i];
      const actDetails = data.activities.find(a => a.id === ta.activityId);
      if (!actDetails) continue;
      
      const [h, m] = ta.startTime.split(":").map(Number);
      let startMins = h * 60 + m;
      
      // If overlap or tight gap (< 45 min comfort space)
      if (i > 0 && startMins < currentEndTime + 45) {
        const correctedStart = currentEndTime + 45; // Shift to end of last activity plus 45 minutes travel time
        const newHour = Math.floor(correctedStart / 60);
        const newMin = correctedStart % 60;
        
        const formattedTime = `${String(newHour).padStart(2, '0')}:${String(newMin).padStart(2, '0')}`;
        
        // Find inside global db state and update
        const dbTa = data.trip_activities.find(x => x.id === ta.id);
        if (dbTa) {
          dbTa.startTime = formattedTime;
          fixesCount++;
        }
        
        startMins = correctedStart;
      }
      
      currentEndTime = startMins + actDetails.duration * 60;
    }
  }
  
  if (fixesCount > 0) {
    db.save(data);
    showToast(`Schedule optimized! Adjusted ${fixesCount} activities for travel comfort.`, "success");
  } else {
    showToast("No scheduling conflicts detected.", "warning");
  }
}

// --- 7. TRIP EXPENSES CALCULATIONS ---
function calculateTripCost(tripId) {
  const data = db.get();
  const trip = data.trips.find(t => t.id === tripId);
  if (!trip) return { total: 0, accommodation: 0, transport: 0, food: 0, activities: 0, shopping: 0, other: 0 };
  
  const stops = data.trip_stops.filter(s => s.tripId === tripId);
  const stopIds = stops.map(s => s.id);
  const tActivities = data.trip_activities.filter(ta => stopIds.includes(ta.stopId));
  
  let activitiesCost = 0;
  tActivities.forEach(ta => {
    const act = data.activities.find(a => a.id === ta.activityId);
    if (act) {
      activitiesCost += act.cost;
    }
  });
  
  const accommodation = trip.accommodationCost !== undefined ? trip.accommodationCost : 0;
  const transport = trip.transportCost !== undefined ? trip.transportCost : 0;
  const food = trip.foodCost !== undefined ? trip.foodCost : 0;
  const shopping = trip.shoppingCost !== undefined ? trip.shoppingCost : 0;
  const other = trip.otherCost !== undefined ? trip.otherCost : 0;
  const total = accommodation + transport + food + activitiesCost + shopping + other;
  
  return {
    total,
    accommodation,
    transport,
    food,
    activities: activitiesCost,
    shopping,
    other
  };
}

// --- 8. SMART BUDGET OPTIMIZER ---
function optimizeTripBudget(tripId) {
  const data = db.get();
  const trip = data.trips.find(t => t.id === tripId);
  if (!trip) return;
  
  const stops = data.trip_stops.filter(s => s.tripId === tripId);
  const stopIds = stops.map(s => s.id);
  
  let changesList = [];
  
  // 1. Optimize accommodation (downgrade/relocate) - reduces cost by 25%
  const oldAccommodation = trip.accommodationCost;
  trip.accommodationCost = Math.round(trip.accommodationCost * 0.75);
  changesList.push(`Downgraded accommodation standard (Saved ₹${(oldAccommodation - trip.accommodationCost).toLocaleString()})`);
  
  // 2. Swap high-cost activities with lower-cost alternatives
  const tActivities = data.trip_activities.filter(ta => stopIds.includes(ta.stopId));
  
  tActivities.forEach(ta => {
    // If French Bakery Class (act_bakery, ₹3500) -> Swap to Pastry Tasting Walk (act_pastry_walk, ₹1200)
    if (ta.activityId === "act_bakery") {
      ta.activityId = "act_pastry_walk";
      changesList.push("Swapped Croissant Masterclass to local Pastry Tasting Walk (Saved ₹2,300)");
    }
    // If Trastevere Food Tour (act_food_tour, ₹4000) -> Swap to Street Food Walk (act_street_food, ₹1500)
    if (ta.activityId === "act_food_tour") {
      ta.activityId = "act_street_food";
      changesList.push("Swapped premium Food Tour to street food walk (Saved ₹2,500)");
    }
    // If Vatican Museum (act_vatican, ₹2500) -> Swap to Free Trevi & Pantheon tour (which is free)
    // Wait! Let's not swap out Rome's biggest museum, let's look at Vatican or Colosseum, or just keep it.
  });
  
  // 3. Optimize food cost (reduces daily food budget by 20%)
  const oldFood = trip.foodCost;
  trip.foodCost = Math.round(trip.foodCost * 0.8);
  changesList.push(`Budgeted for local bistros instead of fine dining (Saved ₹${(oldFood - trip.foodCost).toLocaleString()})`);
  
  db.save(data);
  
  // Render and show optimization details modal
  const listHtml = changesList.map(c => `<li style="margin-bottom:8px; display:flex; align-items:center; gap:8px;"><i class="fa-solid fa-circle-check" style="color:var(--success);"></i><span>${c}</span></li>`).join("");
  
  const modalBody = `
    <div style="text-align:center; margin-bottom:20px;">
      <i class="fa-solid fa-wand-magic-sparkles" style="font-size:3rem; color:var(--primary); margin-bottom:12px;"></i>
      <h4 style="font-weight:800; font-size:1.25rem;">Trip Successfully Optimized!</h4>
      <p style="color:var(--text-muted); font-size:0.9rem;">We adjusted accommodation, food budgets, and swapped high-priced tours to lower cost local favorites.</p>
    </div>
    <div style="background-color:var(--bg-main); border-radius:var(--border-radius-md); padding:16px; border:1px solid var(--border-color); margin-bottom:12px;">
      <h5 style="font-weight:700; margin-bottom:12px; font-size:0.9rem; text-transform:uppercase; color:var(--text-muted);">Adjustments Made:</h5>
      <ul style="list-style:none; padding:0; margin:0; font-size:0.9rem;">
        ${listHtml}
      </ul>
    </div>
  `;
  
  const modalFooter = `<button class="btn btn-primary" id="btn-opt-done">Done</button>`;
  
  const close = openModal("Optimization Engine", modalBody, modalFooter);
  document.getElementById("btn-opt-done").addEventListener("click", () => {
    close();
    // Refresh the current view
    router.resolve();
  });
  
  showToast("Trip cost optimized successfully!", "success");
}

// --- 9. VIEW CONTROLLERS (DOM RENDERERS) ---

const mainContent = document.getElementById("main-content");

// Header Search trigger routing
document.getElementById("global-search-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = e.target.value.trim();
    if (query) {
      window.location.hash = `#explore?search=${encodeURIComponent(query)}`;
    }
  }
});

// Quick CTA trigger
document.getElementById("sidebar-plan-trip-btn").addEventListener("click", () => {
  window.location.hash = "#create-trip";
});
document.getElementById("mobile-plan-trip-btn").addEventListener("click", () => {
  window.location.hash = "#create-trip";
});

// --- MOBILE NAV DRAWER CONTROLLER ---
(function initMobileDrawer() {
  const drawer = document.getElementById("mobile-nav-drawer");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mobile-drawer-close");
  const drawerPlanBtn = document.getElementById("mobile-drawer-plan-btn");

  // Create backdrop element
  const backdrop = document.createElement("div");
  backdrop.className = "mobile-nav-drawer-backdrop";
  backdrop.id = "mobile-drawer-backdrop";
  document.body.appendChild(backdrop);

  function openDrawer() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.classList.remove("visible");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", openDrawer);
  closeBtn.addEventListener("click", closeDrawer);
  backdrop.addEventListener("click", closeDrawer);

  // Plan a trip from drawer
  drawerPlanBtn.addEventListener("click", () => {
    closeDrawer();
    window.location.hash = "#create-trip";
  });

  // Auto-close when a drawer nav item is clicked
  document.querySelectorAll("[data-drawer-nav]").forEach(link => {
    link.addEventListener("click", () => {
      setTimeout(closeDrawer, 100); // small delay so hash change registers first
    });
  });

  // Sync active state in drawer on route change
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash || "#dashboard";
    const viewName = hash.split("/")[0].replace("#", "").split("?")[0];
    document.querySelectorAll("[data-drawer-nav]").forEach(link => {
      const linkView = link.getAttribute("data-view");
      link.classList.toggle("active", linkView === viewName);
    });
  });
})();

// ============================================================
// PREMIUM DASHBOARD — replaces original renderDashboard()
// All data logic preserved; HTML output upgraded to premium UI
// ============================================================
function renderDashboard() {
  const data = db.get();
  const mainTrip = data.trips[0];

  // --- Build 3D Trip Card for main trip ---
  let mainTripCardHtml = '';
  if (mainTrip) {
    const cost = calculateTripCost(mainTrip.id);
    const stops = data.trip_stops.filter(s => s.tripId === mainTrip.id);
    const routeNames = stops.map(s => data.cities[s.cityId]?.name || s.cityId).join(' → ');
    const overBudget = cost.total > mainTrip.budget;
    const progress = Math.min(Math.round((cost.activities > 0 ? 80 : 40)), 100);

    mainTripCardHtml = `
      <div class="trip-card-3d" id="main-trip-card-3d" onclick="window.location.hash='#itinerary/${mainTrip.id}'">
        <div class="trip-card-3d-img">
          <div class="trip-card-3d-badge">Upcoming Trip</div>
          <img src="${mainTrip.coverImg}" alt="${mainTrip.name}" id="trip-card-img-parallax">
          <div class="trip-card-3d-overlay">
            <h3>${mainTrip.name}</h3>
            <p><i class="fa-solid fa-map-pin"></i> ${routeNames}</p>
          </div>
        </div>
        <div class="trip-card-3d-body">
          <div class="trip-meta-grid-3d">
            <div class="trip-meta-item-3d">
              <span class="trip-meta-label-3d">Dates</span>
              <span class="trip-meta-value-3d">${formatDateRange(mainTrip.startDate, mainTrip.endDate)}</span>
            </div>
            <div class="trip-meta-item-3d">
              <span class="trip-meta-label-3d">Duration</span>
              <span class="trip-meta-value-3d">${mainTrip.daysCount} Days</span>
            </div>
            <div class="trip-meta-item-3d">
              <span class="trip-meta-label-3d">Budget</span>
              <span class="trip-meta-value-3d">₹${mainTrip.budget.toLocaleString()}</span>
            </div>
            <div class="trip-meta-item-3d">
              <span class="trip-meta-label-3d">Status</span>
              <span class="trip-meta-value-3d" style="color:${overBudget ? 'var(--error)' : 'var(--success)'}">
                ${overBudget ? '⚠ Over' : '✓ On Track'}
              </span>
            </div>
          </div>
          <div class="planning-progress-bar-wrapper">
            <div class="progress-labels">
              <span>Planning Progress</span>
              <span class="progress-percentage">${progress}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width:${progress}%"></div>
            </div>
          </div>
          <div class="trip-card-3d-actions">
            <a href="#itinerary/${mainTrip.id}" class="btn btn-primary" onclick="event.stopPropagation()">
              <i class="fa-solid fa-arrow-pointer"></i> Continue Planning
            </a>
            <a href="#budget/${mainTrip.id}" class="btn btn-secondary" onclick="event.stopPropagation()">
              <i class="fa-solid fa-wallet"></i> Expenses
            </a>
          </div>
        </div>
      </div>`;
  } else {
    mainTripCardHtml = `
      <div class="empty-list-state">
        <i class="fa-solid fa-plane-departure"></i>
        <h3>No trips planned yet</h3>
        <p>Your next adventure is waiting. Start planning it today!</p>
        <button class="btn btn-primary" onclick="window.location.hash='#create-trip'">+ Plan a Trip</button>
      </div>`;
  }

  // --- Popular destinations ---
  const popularCities = Object.values(data.cities).slice(0, 4);
  const popularHtml = popularCities.map(city => `
    <div class="popular-card" onclick="window.location.hash='#explore?search=${city.name}'">
      <div class="popular-img-wrapper">
        <img src="${city.img}" alt="${city.name}" loading="lazy">
        <div class="popular-card-rating"><i class="fa-solid fa-star"></i><span>${city.rating}</span></div>
      </div>
      <div class="popular-card-info">
        <h4>${city.name}</h4>
        <p>${city.country}</p>
      </div>
    </div>`).join('');

  // --- Render Premium Dashboard HTML ---
  mainContent.innerHTML = `
    <div class="dashboard-grid">

      <!-- ═══════════ PREMIUM HERO ═══════════ -->
      <div class="dashboard-premium-hero section-fade-in" id="hero-section">

        <!-- Floating travel elements (decorative) -->
        <div class="floating-elements" aria-hidden="true">
          <i class="floating-el fa-solid fa-plane-departure"></i>
          <i class="floating-el fa-solid fa-location-dot"></i>
          <i class="floating-el fa-solid fa-compass"></i>
          <i class="floating-el fa-solid fa-suitcase-rolling"></i>
          <i class="floating-el fa-solid fa-map"></i>
        </div>

        <!-- Left: Hero copy + search -->
        <div class="hero-content-left">
          <div class="hero-greeting-tag">
            <i class="fa-solid fa-star"></i>
            Welcome back, ${data.users.name.split(' ')[0]}
          </div>

          <h1 class="hero-main-title">
            Where will<br>you go <span>next?</span>
          </h1>

          <p class="hero-subtitle">
            Plan smarter. Explore further. Travel your way.
          </p>

          <!-- Search bar -->
          <div class="hero-search-premium">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="dashboard-search-input" placeholder="Search destinations, cities, countries...">
            <button class="btn-hero-search" id="dashboard-search-btn">Search</button>
          </div>

          <!-- CTA Buttons -->
          <div class="hero-actions-row">
            <button class="btn-hero-plan" onclick="window.location.hash='#create-trip'">
              <i class="fa-solid fa-plus"></i> Plan a Trip
            </button>
            <button class="btn-hero-explore" onclick="window.location.hash='#explore'">
              <i class="fa-solid fa-compass"></i> Explore
            </button>
          </div>
        </div>

        <!-- Right: 3D Globe -->
        <div class="hero-globe-panel">
          <div id="globe-canvas-container">
            <!-- Three.js canvas OR CSS fallback rendered here by initGlobe() -->
          </div>
        </div>
      </div>

      <!-- ═══════════ ANIMATED STATS ═══════════ -->
      <div class="stats-cards-row section-fade-in" id="stats-section">
        <div class="stat-card">
          <div class="stat-icon-wrap"><i class="fa-solid fa-plane-departure"></i></div>
          <div class="stat-number" data-target="3" data-prefix="">0</div>
          <div class="stat-label">Upcoming Trips</div>
          <div class="stat-change up"><i class="fa-solid fa-arrow-trend-up"></i> +1 this month</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap"><i class="fa-solid fa-earth-americas"></i></div>
          <div class="stat-number" data-target="12" data-prefix="">0</div>
          <div class="stat-label">Countries Visited</div>
          <div class="stat-change up"><i class="fa-solid fa-arrow-trend-up"></i> +2 this year</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap"><i class="fa-solid fa-calendar-check"></i></div>
          <div class="stat-number" data-target="47" data-prefix="">0</div>
          <div class="stat-label">Days Traveled</div>
          <div class="stat-change neutral"><i class="fa-solid fa-minus"></i> Lifetime</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap"><i class="fa-solid fa-piggy-bank"></i></div>
          <div class="stat-number" data-target="18450" data-prefix="₹">₹0</div>
          <div class="stat-label">Total Saved</div>
          <div class="stat-change up"><i class="fa-solid fa-arrow-trend-up"></i> Great job!</div>
        </div>
      </div>

      <!-- ═══════════ UPCOMING TRIP CARD + QUICK ACTIONS ═══════════ -->
      <div class="dashboard-layout-row section-fade-in" id="trips-section">
        <!-- Left: 3D Trip Card -->
        <div style="display:flex;flex-direction:column;gap:24px;">
          <div class="section-title-row">
            <h3>Your Next Adventure</h3>
            <a href="#my-trips" class="btn-text">All Trips <i class="fa-solid fa-arrow-right"></i></a>
          </div>
          ${mainTripCardHtml}
        </div>

        <!-- Right: Quick Actions -->
        <div style="display:flex;flex-direction:column;gap:24px;">
          <div class="section-title-row"><h3>Quick Actions</h3></div>
          <div class="quick-actions-card">
            <div class="action-card-btn" onclick="window.location.hash='#create-trip'">
              <div class="action-icon color-primary"><i class="fa-solid fa-plus"></i></div>
              <div class="action-details">
                <span class="action-title">Plan a Trip</span>
                <span class="action-desc">Create a new detailed travel plan</span>
              </div>
            </div>
            <div class="action-card-btn" onclick="window.location.hash='#explore'">
              <div class="action-icon color-accent"><i class="fa-solid fa-earth-europe"></i></div>
              <div class="action-details">
                <span class="action-title">Explore Destinations</span>
                <span class="action-desc">Search and discover global cities</span>
              </div>
            </div>
            <div class="action-card-btn" onclick="window.location.hash='#community'">
              <div class="action-icon color-green"><i class="fa-solid fa-users"></i></div>
              <div class="action-details">
                <span class="action-title">Browse Community Trips</span>
                <span class="action-desc">Clone and copy popular routes</span>
              </div>
            </div>
            <div class="action-card-btn" onclick="window.location.hash='#calendar'">
              <div class="action-icon" style="background:var(--warning-light);color:var(--warning)"><i class="fa-solid fa-calendar-days"></i></div>
              <div class="action-details">
                <span class="action-title">View Calendar</span>
                <span class="action-desc">See your travel schedule</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════ INTERACTIVE TRAVEL ROUTE ═══════════ -->
      <div class="section-fade-in" id="route-section">
        <div class="section-title-row">
          <h3>Your Dream Route</h3>
          <a href="#explore" class="btn-text">Customize <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div id="route-viz-container"></div>
      </div>

      <!-- ═══════════ POPULAR DESTINATIONS ═══════════ -->
      <div class="section-fade-in" id="popular-section">
        <div class="section-title-row">
          <h3>Popular Destinations</h3>
          <a href="#explore" class="btn-text">View All <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="popular-scroller">${popularHtml}</div>
      </div>

      <!-- ═══════════ BUDGET ANALYZER ═══════════ -->
      <div class="section-fade-in" id="budget-analyzer-section">
        <div class="section-title-row">
          <h3>Budget Analyzer</h3>
          ${mainTrip ? `<a href="#budget/${mainTrip.id}" class="btn-text">Full View <i class="fa-solid fa-arrow-right"></i></a>` : ''}
        </div>
        <div id="dashboard-budget-container"></div>
      </div>

    </div>
  `;

  // --- Wire search ---
  const executeSearch = () => {
    const val = document.getElementById('dashboard-search-input').value.trim();
    if (val) window.location.hash = `#explore?search=${encodeURIComponent(val)}`;
  };
  document.getElementById('dashboard-search-btn').addEventListener('click', executeSearch);
  document.getElementById('dashboard-search-input').addEventListener('keypress', e => {
    if (e.key === 'Enter') executeSearch();
  });

  // --- Post-render: init all premium modules ---
  requestAnimationFrame(() => {
    initGlobe('globe-canvas-container');
    renderRouteVisualization('route-viz-container');
    renderDashboardBudgetAnalyzer('dashboard-budget-container');
    initCardTilt();
    animateCounters();
    initSectionFadeIn();
  });
}

// --- 10. CREATE TRIP WIZARD CONTROLLER ---
let wizardState = {
  step: 1,
  details: { name: "", startDate: "", endDate: "", budget: 50000, desc: "", cover: "" },
  selectedCities: [], // IDs
  interests: [],
  travelStyle: "Balanced"
};

function renderCreateTrip() {
  wizardState = {
    step: 1,
    details: { name: "", startDate: "", endDate: "", budget: 50000, desc: "", cover: "" },
    selectedCities: [],
    interests: [],
    travelStyle: "Balanced"
  };
  
  mainContent.innerHTML = `
    <div class="wizard-container">
      <div class="wizard-card">
        
        <!-- Progress Steps Tracker -->
        <div class="wizard-progress">
          <div class="progress-step-indicator" id="wizard-progress-bar" style="width: 0%;"></div>
          
          <div class="wizard-step active" data-step="1">
            <span class="step-num">1</span>
            <span class="step-label">Trip Details</span>
          </div>
          <div class="wizard-step" data-step="2">
            <span class="step-num">2</span>
            <span class="step-label">Destinations</span>
          </div>
          <div class="wizard-step" data-step="3">
            <span class="step-num">3</span>
            <span class="step-label">Preferences</span>
          </div>
        </div>
        
        <!-- STEP 1: TRIP DETAILS FORM -->
        <div class="wizard-form-step active" id="wizard-step-1">
          <h2 style="font-size:1.5rem; margin-bottom:20px; font-weight:800;">Let's get started on your trip ✈️</h2>
          
          <div class="form-group">
            <label for="wiz-trip-name">Trip Name</label>
            <input type="text" id="wiz-trip-name" placeholder="e.g. European Summer Escapade" required>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="wiz-start-date">Start Date</label>
              <input type="date" id="wiz-start-date" required>
            </div>
            <div class="form-group">
              <label for="wiz-end-date">End Date</label>
              <input type="date" id="wiz-end-date" required>
            </div>
          </div>
          
          <div class="form-group">
            <label for="wiz-budget">Budget (INR/₹)</label>
            <input type="number" id="wiz-budget" value="60000" min="1000" required>
          </div>
          
          <div class="form-group">
            <label for="wiz-desc">Trip Description (Optional)</label>
            <textarea id="wiz-desc" rows="3" placeholder="Tell us about the dream itinerary..."></textarea>
          </div>
          
          <div class="form-actions-row">
            <div></div>
            <button class="btn btn-primary" id="btn-wizard-step1-next">Continue <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
        
        <!-- STEP 2: DESTINATIONS SELECTION -->
        <div class="wizard-form-step" id="wizard-step-2">
          <h2 style="font-size:1.5rem; margin-bottom:8px; font-weight:800;">Where are you planning to stop? 🗺️</h2>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:20px;">Choose one or more destinations. You can drag or arrange the itinerary sequence.</p>
          
          <div class="destination-search-box">
            <div class="hero-search-wrapper" style="max-width:100%; margin-top:0;">
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
              <input type="text" id="wiz-city-search" placeholder="Search cities...">
            </div>
          </div>
          
          <!-- Route Chain sequence display -->
          <div class="selected-sequence-container" id="sequence-container-wrapper" style="display:none;">
            <div class="sequence-label">Route stops sequence</div>
            <div class="selected-sequence-list" id="wizard-selected-sequence">
              <!-- Rendered sequence e.g. Paris -> Rome -->
            </div>
          </div>
          
          <!-- Cities selection grid -->
          <div class="destinations-grid" id="wizard-destinations-grid">
            <!-- Dynamically populated cities -->
          </div>
          
          <div class="form-actions-row">
            <button class="btn btn-secondary" id="btn-wizard-step2-prev"><i class="fa-solid fa-arrow-left"></i> Back</button>
            <button class="btn btn-primary" id="btn-wizard-step2-next">Continue <i class="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
        
        <!-- STEP 3: PREFERENCES SELECTION -->
        <div class="wizard-form-step" id="wizard-step-3">
          <h2 style="font-size:1.5rem; margin-bottom:8px; font-weight:800;">Tailor your experiences ✨</h2>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:20px;">What are your primary travel styles and interests?</p>
          
          <div class="form-group">
            <label style="margin-bottom:12px;">Interests (Select all that apply)</label>
            <div class="interest-chips-group">
              <div class="interest-chip" data-interest="Culture">
                <i class="fa-solid fa-landmark"></i>
                <span>Culture</span>
              </div>
              <div class="interest-chip" data-interest="Food">
                <i class="fa-solid fa-utensils"></i>
                <span>Food</span>
              </div>
              <div class="interest-chip" data-interest="Adventure">
                <i class="fa-solid fa-hiking"></i>
                <span>Adventure</span>
              </div>
              <div class="interest-chip" data-interest="Nature">
                <i class="fa-solid fa-tree"></i>
                <span>Nature</span>
              </div>
              <div class="interest-chip" data-interest="Beaches">
                <i class="fa-solid fa-umbrella-beach"></i>
                <span>Beaches</span>
              </div>
              <div class="interest-chip" data-interest="Shopping">
                <i class="fa-solid fa-bag-shopping"></i>
                <span>Shopping</span>
              </div>
              <div class="interest-chip" data-interest="History">
                <i class="fa-solid fa-hourglass-half"></i>
                <span>History</span>
              </div>
              <div class="interest-chip" data-interest="Nightlife">
                <i class="fa-solid fa-champagne-glasses"></i>
                <span>Nightlife</span>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label style="margin-bottom:12px;">Travel Style</label>
            <div class="style-selector-group">
              <div class="style-option" data-style="Budget">
                <h4>Budget</h4>
                <p>Economic options and free walks</p>
              </div>
              <div class="style-option selected" data-style="Balanced">
                <h4>Balanced</h4>
                <p>Curated mix of comfort and adventure</p>
              </div>
              <div class="style-option" data-style="Premium">
                <h4>Premium</h4>
                <p>First-class tours and boutique stay</p>
              </div>
            </div>
          </div>
          
          <div class="form-actions-row">
            <button class="btn btn-secondary" id="btn-wizard-step3-prev"><i class="fa-solid fa-arrow-left"></i> Back</button>
            <button class="btn btn-primary" id="btn-wizard-submit">Create My Trip <i class="fa-solid fa-wand-magic-sparkles"></i></button>
          </div>
        </div>
        
      </div>
    </div>
  `;
  
  // Add listeners for step transitions
  document.getElementById("btn-wizard-step1-next").addEventListener("click", () => {
    // Validate Step 1
    const name = document.getElementById("wiz-trip-name").value.trim();
    const start = document.getElementById("wiz-start-date").value;
    const end = document.getElementById("wiz-end-date").value;
    const budget = Number(document.getElementById("wiz-budget").value);
    
    if (!name || !start || !end || !budget) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    
    if (new Date(end) < new Date(start)) {
      showToast("End date cannot be before start date.", "error");
      return;
    }
    
    wizardState.details = {
      name,
      startDate: start,
      endDate: end,
      budget,
      desc: document.getElementById("wiz-desc").value.trim(),
      cover: "" // Default loaded cover image based on selected cities later
    };
    
    goToStep(2);
  });
  
  document.getElementById("btn-wizard-step2-prev").addEventListener("click", () => goToStep(1));
  
  document.getElementById("btn-wizard-step2-next").addEventListener("click", () => {
    if (wizardState.selectedCities.length === 0) {
      showToast("Please select at least one destination stop.", "error");
      return;
    }
    goToStep(3);
  });
  
  document.getElementById("btn-wizard-step3-prev").addEventListener("click", () => goToStep(2));
  
  // Submit action triggers creation
  document.getElementById("btn-wizard-submit").addEventListener("click", executeCreateTrip);
  
  // Load and render step 2 cities search grid
  renderWizardCities();
  
  // Interest chips selections listener
  document.querySelectorAll(".interest-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const int = chip.getAttribute("data-interest");
      chip.classList.toggle("selected");
      if (wizardState.interests.includes(int)) {
        wizardState.interests = wizardState.interests.filter(i => i !== int);
      } else {
        wizardState.interests.push(int);
      }
    });
  });
  
  // Style option listener
  document.querySelectorAll(".style-option").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".style-option").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      wizardState.travelStyle = opt.getAttribute("data-style");
    });
  });
}

function goToStep(stepNum) {
  wizardState.step = stepNum;
  
  // Toggle forms active state
  document.querySelectorAll(".wizard-form-step").forEach((form, idx) => {
    form.classList.toggle("active", idx + 1 === stepNum);
  });
  
  // Update step visual classes
  document.querySelectorAll(".wizard-step").forEach((step, idx) => {
    const sVal = idx + 1;
    step.classList.toggle("active", sVal === stepNum);
    step.classList.toggle("completed", sVal < stepNum);
  });
  
  // Update progress bar
  const pct = ((stepNum - 1) / 2) * 100;
  document.getElementById("wizard-progress-bar").style.width = `${pct}%`;
}

function renderWizardCities(searchQuery = "") {
  const data = db.get();
  const grid = document.getElementById("wizard-destinations-grid");
  const filtered = Object.values(data.cities).filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  grid.innerHTML = filtered.map(city => {
    const isSelected = wizardState.selectedCities.includes(city.id);
    return `
      <div class="dest-card ${isSelected ? 'selected' : ''}" data-id="${city.id}">
        <img src="${city.img}" class="dest-card-img">
        <div class="dest-card-content">
          <div class="dest-card-meta">
            <h4>${city.name}</h4>
            <p>${city.country}</p>
          </div>
          <div class="dest-card-bottom">
            <div class="dest-card-metrics">
              <span class="dest-card-rating"><i class="fa-solid fa-star"></i> ${city.rating}</span>
              <span class="dest-card-cost">${"$".repeat(city.costIndex)}</span>
            </div>
            <button class="btn btn-secondary btn-icon add-city-btn" style="width:28px; height:28px;">
              <i class="fa-solid ${isSelected ? 'fa-check' : 'fa-plus'}"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
  
  // Search listeners
  const sInput = document.getElementById("wiz-city-search");
  sInput.removeEventListener("input", sInput._handler);
  sInput._handler = (e) => renderWizardCities(e.target.value);
  sInput.addEventListener("input", sInput._handler);
  
  // Click listener for cards
  grid.querySelectorAll(".dest-card").forEach(card => {
    card.addEventListener("click", () => {
      const cityId = card.getAttribute("data-id");
      toggleCitySelection(cityId);
    });
  });
}

function toggleCitySelection(cityId) {
  if (wizardState.selectedCities.includes(cityId)) {
    wizardState.selectedCities = wizardState.selectedCities.filter(id => id !== cityId);
  } else {
    wizardState.selectedCities.push(cityId);
  }
  
  updateWizardSequence();
  renderWizardCities(document.getElementById("wiz-city-search").value);
}

// Render the reorderable horizontal stops chain in step 2
function updateWizardSequence() {
  const data = db.get();
  const wrapper = document.getElementById("sequence-container-wrapper");
  const list = document.getElementById("wizard-selected-sequence");
  
  if (wizardState.selectedCities.length === 0) {
    wrapper.style.display = "none";
    return;
  }
  
  wrapper.style.display = "block";
  
  let listHtml = "";
  wizardState.selectedCities.forEach((cityId, index) => {
    const city = data.cities[cityId];
    if (!city) return;
    
    // Add arrow prefix except for first stop
    if (index > 0) {
      listHtml += `<i class="fa-solid fa-arrow-right sequence-arrow"></i>`;
    }
    
    listHtml += `
      <div class="sequence-item" data-idx="${index}">
        <span>${city.name}</span>
        ${index > 0 ? `<button class="sequence-item-btn btn-seq-left" title="Move Left"><i class="fa-solid fa-arrow-left" style="font-size:0.75rem;"></i></button>` : ''}
        ${index < wizardState.selectedCities.length - 1 ? `<button class="sequence-item-btn btn-seq-right" title="Move Right"><i class="fa-solid fa-arrow-right" style="font-size:0.75rem;"></i></button>` : ''}
        <button class="sequence-item-remove" title="Remove"><i class="fa-solid fa-circle-xmark"></i></button>
      </div>
    `;
  });
  
  list.innerHTML = listHtml;
  
  // Reorder buttons action listeners
  list.querySelectorAll(".btn-seq-left").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.closest(".sequence-item").getAttribute("data-idx"));
      if (idx > 0) {
        const temp = wizardState.selectedCities[idx];
        wizardState.selectedCities[idx] = wizardState.selectedCities[idx - 1];
        wizardState.selectedCities[idx - 1] = temp;
        updateWizardSequence();
      }
    });
  });
  
  list.querySelectorAll(".btn-seq-right").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.closest(".sequence-item").getAttribute("data-idx"));
      if (idx < wizardState.selectedCities.length - 1) {
        const temp = wizardState.selectedCities[idx];
        wizardState.selectedCities[idx] = wizardState.selectedCities[idx + 1];
        wizardState.selectedCities[idx + 1] = temp;
        updateWizardSequence();
      }
    });
  });
  
  // Remove button action
  list.querySelectorAll(".sequence-item-remove").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.closest(".sequence-item").getAttribute("data-idx"));
      const cityId = wizardState.selectedCities[idx];
      toggleCitySelection(cityId);
    });
  });
}

// Generate trip with dynamic loader
function executeCreateTrip() {
  const data = db.get();
  
  // 1. Swap active display to Loading Animation screen
  mainContent.innerHTML = `
    <div class="generation-loading-container">
      <div class="loading-illustration">
        <i class="fa-solid fa-earth-americas globe-icon-spin"></i>
        <div class="loading-pulses"></div>
      </div>
      <h2 id="loading-stage-text">Building your personalized trip...</h2>
      <p id="loading-stage-desc">Scanning activities and lodging details matches for your interests.</p>
      
      <div class="generation-tips-box" id="loading-tip">
        <strong>Tip:</strong> Slower routes often provide the best cultural sights.
      </div>
    </div>
  `;
  
  // Phase out text updates during loading states
  const stages = [
    { text: "Curating city stops schedule...", desc: "Aligning transit options and local dates.", tip: "Setting up base locations..." },
    { text: "Discovering matches for interests...", desc: "Finding top activities based on selected tags.", tip: "Matching history, cuisine and exploration tags..." },
    { text: "Optimizing itinerary conflicts...", desc: "Preventing overlapping schedules and tight travel windows.", tip: "Verifying travel distances..." },
    { text: "Double checking estimates...", desc: "Adding transport and daily expense averages.", tip: "Almost ready to fly!" }
  ];
  
  let currentStageIndex = 0;
  const interval = setInterval(() => {
    if (currentStageIndex < stages.length) {
      document.getElementById("loading-stage-text").textContent = stages[currentStageIndex].text;
      document.getElementById("loading-stage-desc").textContent = stages[currentStageIndex].desc;
      document.getElementById("loading-tip").innerHTML = `<strong>Tip:</strong> ${stages[currentStageIndex].tip}`;
      currentStageIndex++;
    }
  }, 600);
  
  // Complete creation after 3 seconds
  setTimeout(() => {
    clearInterval(interval);
    
    // Save New Trip to Mock DB
    const newTripId = `trip_${Date.now()}`;
    const sDate = new Date(wizardState.details.startDate);
    const eDate = new Date(wizardState.details.endDate);
    const diffTime = Math.abs(eDate - sDate);
    const daysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Determine Cover Image
    const coverCityId = wizardState.selectedCities[0];
    const coverCity = data.cities[coverCityId];
    const coverImg = coverCity ? coverCity.img : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";
    
    const newTripObj = {
      id: newTripId,
      name: wizardState.details.name,
      startDate: wizardState.details.startDate,
      endDate: wizardState.details.endDate,
      daysCount: daysCount,
      budget: wizardState.details.budget,
      description: wizardState.details.desc || `An awesome trip around ${wizardState.selectedCities.map(c => data.cities[c]?.name || c).join(" and ")}.`,
      coverImg: coverImg,
      travelStyle: wizardState.travelStyle,
      interests: [...wizardState.interests],
      isPublic: false,
      stats: { views: 0, likes: 0 },
      // Mock Base Costs
      transportCost: Math.round(daysCount * 1200 + wizardState.selectedCities.length * 4000),
      accommodationCost: Math.round(daysCount * 3000),
      foodCost: Math.round(daysCount * 1500)
    };
    
    // Create Stops
    const newStops = [];
    const stopLength = wizardState.selectedCities.length;
    const daysPerStop = Math.max(1, Math.floor(daysCount / stopLength));
    
    wizardState.selectedCities.forEach((cityId, index) => {
      const stopId = `stop_${Date.now()}_${index}`;
      
      // Distribute days across stops
      const startDay = index * daysPerStop + 1;
      const endDay = index === stopLength - 1 ? daysCount : (index + 1) * daysPerStop;
      const daysArr = [];
      for (let d = startDay; d <= endDay; d++) daysArr.push(d);
      
      newStops.push({
        id: stopId,
        tripId: newTripId,
        cityId: cityId,
        days: daysArr
      });
    });
    
    // Add default activities based on user interests
    const newTripActivities = [];
    let actIdIndex = 0;
    
    newStops.forEach(stop => {
      // Find matches from core database activities matching this city
      const cityActs = data.activities.filter(a => a.cityId === stop.cityId);
      
      stop.days.forEach(day => {
        // Pick top activities matching preferences
        let matchedActs = cityActs.filter(a => wizardState.interests.includes(a.category));
        
        // If no matching interests found, take first two items
        if (matchedActs.length === 0) matchedActs = cityActs;
        
        // Pick up to 2 items per day
        const dayChoices = matchedActs.slice(0, 2);
        
        dayChoices.forEach((act, actIdx) => {
          const time = actIdx === 0 ? "10:00" : "14:30";
          newTripActivities.push({
            id: `ta_${Date.now()}_${actIdIndex++}`,
            stopId: stop.id,
            activityId: act.id,
            day: day,
            startTime: time
          });
        });
      });
    });
    
    // Write changes back to DB
    data.trips.unshift(newTripObj);
    data.trip_stops.push(...newStops);
    data.trip_activities.push(...newTripActivities);
    db.save(data);
    
    // Show success ready screen
    mainContent.innerHTML = `
      <div class="generation-ready-card">
        <div class="success-badge-icon">
          <i class="fa-solid fa-sparkles"></i>
        </div>
        <h2>Your trip is ready ✨</h2>
        <p style="color:var(--text-muted);">We have crafted a custom itinerary based on your preferred style and destination spots.</p>
        
        <div class="ready-summary-box">
          <div class="ready-summary-item">
            <span class="ready-summary-label">Destinations</span>
            <span class="ready-summary-val">${wizardState.selectedCities.map(c => data.cities[c]?.name || c).join(" & ")}</span>
          </div>
          <div class="ready-summary-item">
            <span class="ready-summary-label">Days / Dates</span>
            <span class="ready-summary-val">${daysCount} Days (${formatDateRange(newTripObj.startDate, newTripObj.endDate)})</span>
          </div>
          <div class="ready-summary-item">
            <span class="ready-summary-label">Estimated Budget</span>
            <span class="ready-summary-val">₹${newTripObj.budget.toLocaleString()}</span>
          </div>
        </div>
        
        <div class="ready-actions">
          <button class="btn btn-primary" id="btn-view-itinerary" style="padding:14px 28px;">View Itinerary</button>
          <button class="btn btn-secondary" id="btn-customize-trip" style="padding:14px 28px;">Customize</button>
        </div>
      </div>
    `;
    
    document.getElementById("btn-view-itinerary").addEventListener("click", () => {
      window.location.hash = `#itinerary/${newTripId}`;
    });
    document.getElementById("btn-customize-trip").addEventListener("click", () => {
      window.location.hash = `#itinerary/${newTripId}`;
    });
    
    showToast("Trip created successfully! 🎉", "success");
    
  }, 3000);
}

// --- 11. ITINERARY BUILDER CONTROLLER ---
function renderItinerary(tripId) {
  const data = db.get();
  const trip = data.trips.find(t => t.id === tripId);
  if (!trip) {
    mainContent.innerHTML = `
      <div class="empty-list-state">
        <i class="fa-solid fa-circle-exclamation"></i>
        <h3>Trip Not Found</h3>
        <button class="btn btn-primary" onclick="window.location.hash='#dashboard'">Back to Dashboard</button>
      </div>
    `;
    return;
  }
  
  // Calculate expenses and checks
  const cost = calculateTripCost(tripId);
  const stops = data.trip_stops.filter(s => s.tripId === tripId);
  const stopIds = stops.map(s => s.id);
  const tActivities = data.trip_activities.filter(ta => stopIds.includes(ta.stopId));
  
  // Run Conflict Detector
  const conflicts = checkConflicts(trip);
  
  // Route Name badges
  const routeString = stops.map(s => data.cities[s.cityId]?.name || s.cityId).join(" → ");
  
  // Health markers
  const budgetPass = cost.total <= trip.budget;
  const overlapsCount = conflicts.filter(c => c.type === "overlap").length;
  const gapsCount = conflicts.filter(c => c.type === "gap").length;
  const countCount = conflicts.filter(c => c.type === "count").length;
  
  // Display Warning Conflicts
  let conflictBannerHtml = "";
  if (conflicts.length > 0) {
    // Show top major conflict warning if exists
    const major = conflicts.find(c => c.type === "overlap") || conflicts.find(c => c.type === "gap") || conflicts[0];
    
    const showFixButton = conflicts.some(c => c.type === "overlap" || c.type === "gap");
    
    conflictBannerHtml = `
      <div class="conflict-warning-banner">
        <div class="conflict-info">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>${major.message} ${conflicts.length > 1 ? `(+${conflicts.length - 1} other conflicts)` : ''}</span>
        </div>
        ${showFixButton ? `<button class="btn btn-danger" id="btn-fix-conflicts" style="padding: 6px 14px; font-size:0.85rem;"><i class="fa-solid fa-wand-magic-sparkles"></i> Fix Schedule</button>` : ''}
      </div>
    `;
  }
  
  // Render Day Cards
  let daysCardsHtml = "";
  for (let dayNum = 1; dayNum <= trip.daysCount; dayNum++) {
    // Find stop city matching this day index
    const stop = stops.find(s => s.days.includes(dayNum));
    const city = stop ? data.cities[stop.cityId] : null;
    
    // Find activities scheduled for this day
    const dayActs = tActivities.filter(ta => ta.day === dayNum);
    dayActs.sort((a, b) => a.startTime.localeCompare(b.startTime));
    
    let activitiesListHtml = "";
    if (dayActs.length > 0) {
      activitiesListHtml = dayActs.map((ta, idx) => {
        const act = data.activities.find(a => a.id === ta.activityId);
        if (!act) return "";
        
        // Calculate End Time
        const [h, m] = ta.startTime.split(":").map(Number);
        const startMins = h * 60 + m;
        const endMins = startMins + act.duration * 60;
        const endH = Math.floor(endMins / 60);
        const endM = endMins % 60;
        const endTime = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
        
        // Check if this specific row is in conflict
        const isOverlap = conflicts.some(c => c.type === "overlap" && (c.act1 === ta.id || c.act2 === ta.id));
        
        // Render travel gap spacing warning below this element if needed
        let gapWarningHtml = "";
        if (idx < dayActs.length - 1) {
          const nextTa = dayActs[idx + 1];
          const nextAct = data.activities.find(a => a.id === nextTa.activityId);
          if (nextAct) {
            const nextStart = nextTa.startTime.split(":").map(Number);
            const nextStartMins = nextStart[0] * 60 + nextStart[1];
            const gap = nextStartMins - endMins;
            if (gap < 30) {
              gapWarningHtml = `
                <div class="timeline-travel-gap warning-gap">
                  <i class="fa-solid fa-car-side"></i>
                  <span>${gap} minutes between ${act.name} and ${nextAct.name} may be too short.</span>
                </div>
              `;
            } else {
              gapWarningHtml = `
                <div class="timeline-travel-gap">
                  <i class="fa-solid fa-arrow-down"></i>
                  <span>${gap} minutes travel gap</span>
                </div>
              `;
            }
          }
        }
        
        return `
          <div class="timeline-activity-row ${isOverlap ? 'conflict-row' : ''}">
            <div class="activity-time-slot">${ta.startTime}</div>
            <div class="activity-node-marker"></div>
            <div class="activity-detail-card" data-ta-id="${ta.id}">
              <div class="activity-card-left">
                <img src="${act.img}" class="activity-avatar">
                <div class="activity-text-info">
                  <h4>${act.name}</h4>
                  <div class="activity-meta-tags">
                    <span class="activity-tag"><i class="fa-regular fa-clock"></i> ${act.duration} hrs</span>
                    <span class="activity-tag tag-cost">₹${act.cost.toLocaleString()}</span>
                    <span class="activity-tag">${act.category}</span>
                  </div>
                </div>
              </div>
              <div class="activity-card-right">
                <button class="activity-actions-trigger" data-ta-id="${ta.id}"><i class="fa-solid fa-ellipsis-vertical"></i></button>
              </div>
            </div>
          </div>
          ${gapWarningHtml}
        `;
      }).join("");
    } else {
      activitiesListHtml = `
        <div class="timeline-empty-day-state">
          <i class="fa-solid fa-plane-slash" style="font-size:2rem;"></i>
          <p>Relax and explore! No activities scheduled for this day.</p>
          <button class="btn btn-secondary btn-sm btn-add-day-act" data-day="${dayNum}" data-stop-id="${stop ? stop.id : ''}">+ Add Activity</button>
        </div>
      `;
    }
    
    daysCardsHtml += `
      <div class="timeline-day-card" id="day-card-${dayNum}">
        <div class="timeline-day-header" data-day="${dayNum}">
          <div class="day-header-left">
            <span class="day-number-badge">D${dayNum}</span>
            <div class="day-info">
              <h3>${city ? city.name : 'Transit Stop'}</h3>
              <p>Day ${dayNum} of itinerary</p>
            </div>
          </div>
          <div class="day-header-right">
            <div class="day-header-metrics">
              <span>${dayActs.length} Activities</span>
              <span>•</span>
              <span>₹${dayActs.reduce((acc, curr) => acc + (data.activities.find(a => a.id === curr.activityId)?.cost || 0), 0).toLocaleString()}</span>
            </div>
            <button class="btn btn-primary btn-sm btn-add-day-act" data-day="${dayNum}" data-stop-id="${stop ? stop.id : ''}" style="padding:6px 12px; font-size:0.8rem;">
              <i class="fa-solid fa-plus"></i> Add
            </button>
            <i class="fa-solid fa-chevron-down day-header-chevron"></i>
          </div>
        </div>
        <div class="timeline-day-body">
          <div class="timeline-track-line"></div>
          ${activitiesListHtml}
        </div>
      </div>
    `;
  }
  
  // Stops chain for sticky sidebar
  const chainHtml = stops.map(s => {
    const c = data.cities[s.cityId];
    return `
      <div class="stop-chain-node">
        ${c ? c.name : s.cityId}
        <span>Day ${s.days.join(", D")}</span>
      </div>
    `;
  }).join("");
  
  mainContent.innerHTML = `
    <!-- Sticky tabs bar inside trip context -->
    <div class="trips-tabs-bar" style="margin-bottom: 24px;">
      <a href="#itinerary/${tripId}" class="trips-tab active">Itinerary Builder</a>
      <a href="#budget/${tripId}" class="trips-tab">Budget Analyzer</a>
      <a href="#calendar/${tripId}" class="trips-tab">Calendar View</a>
      <a href="#share/${tripId}" class="trips-tab"><i class="fa-solid fa-share-nodes"></i> Share Trip</a>
    </div>
    
    <div class="itinerary-layout">
      
      <!-- Left side: Itinerary tracks -->
      <div class="itinerary-main-section">
        
        <div class="itinerary-header-info">
          <div class="itinerary-title-area">
            <h1>${trip.name}</h1>
            <p>
              <span><i class="fa-regular fa-calendar"></i> ${formatDateRange(trip.startDate, trip.endDate)}</span>
              <span class="route-badge">${routeString}</span>
            </p>
          </div>
        </div>
        
        <!-- Trip health checks card -->
        <div class="trip-health-card">
          <div class="health-title">Itinerary Health Checks</div>
          <div class="health-grid">
            <div class="health-metric-item ${budgetPass ? 'pass' : 'fail'}">
              <i class="fa-solid ${budgetPass ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
              <span>Budget Status (${budgetPass ? 'Healthy' : 'Overflow'})</span>
            </div>
            <div class="health-metric-item ${overlapsCount === 0 ? 'pass' : 'fail'}">
              <i class="fa-solid ${overlapsCount === 0 ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
              <span>Overlapping Times (${overlapsCount === 0 ? 'None' : `${overlapsCount} found`})</span>
            </div>
            <div class="health-metric-item ${gapsCount === 0 ? 'pass' : 'warn'}">
              <i class="fa-solid ${gapsCount === 0 ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i>
              <span>Travel Buffers (${gapsCount === 0 ? 'Adequate' : 'Tight'})</span>
            </div>
            <div class="health-metric-item ${countCount === 0 ? 'pass' : 'warn'}">
              <i class="fa-solid ${countCount === 0 ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i>
              <span>Schedule Pace (${countCount === 0 ? 'Relaxed' : 'Crowded'})</span>
            </div>
          </div>
        </div>
        
        <!-- Conflicts warn list -->
        <div class="itinerary-conflicts-section">
          ${conflictBannerHtml}
        </div>
        
        <!-- Day cards timeline -->
        <div class="timeline-container">
          ${daysCardsHtml}
        </div>
        
      </div>
      
      <!-- Right side: Sticky summary column -->
      <div class="itinerary-sticky-sidebar">
        
        <div class="sticky-summary-card">
          <div class="summary-sidebar-header">
            <h3>Trip Overview</h3>
          </div>
          <div class="summary-sidebar-list">
            <div class="summary-sidebar-row">
              <span class="text-muted">Total stops</span>
              <span class="font-bold">${stops.length} Cities</span>
            </div>
            <div class="summary-sidebar-row">
              <span class="text-muted">Duration</span>
              <span class="font-bold">${trip.daysCount} Days</span>
            </div>
            <div class="summary-sidebar-row">
              <span class="text-muted">Accommodation</span>
              <span>₹${cost.accommodation.toLocaleString()}</span>
            </div>
            <div class="summary-sidebar-row">
              <span class="text-muted">Transport</span>
              <span>₹${cost.transport.toLocaleString()}</span>
            </div>
            <div class="summary-sidebar-row">
              <span class="text-muted">Food Allocation</span>
              <span>₹${cost.food.toLocaleString()}</span>
            </div>
            <div class="summary-sidebar-row">
              <span class="text-muted">Activities Cost</span>
              <span>₹${cost.activities.toLocaleString()}</span>
            </div>
            
            <div class="summary-sidebar-row total-row">
              <span>Estimated Cost</span>
              <span style="color: ${cost.total > trip.budget ? 'var(--error)' : 'var(--success)'};">₹${cost.total.toLocaleString()}</span>
            </div>
          </div>
          
          <div style="margin-top:20px;">
            <button class="btn btn-primary" id="btn-sidebar-optimize" style="width:100%;">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Optimize My Budget
            </button>
          </div>
        </div>
        
        <div class="sticky-summary-card">
          <div class="summary-sidebar-header" style="border:none; margin:0; padding-bottom:8px;">
            <h3 style="font-size:1.1rem; color:var(--text-muted); text-transform:uppercase;">Stops Sequence</h3>
          </div>
          <div class="summary-stops-chain">
            ${chainHtml}
          </div>
          <div style="margin-top:16px;">
            <button class="btn btn-secondary btn-sm" id="btn-add-city-stop" style="width:100%; font-size:0.85rem;">
              <i class="fa-solid fa-map-pin"></i> Add City Stop
            </button>
          </div>
        </div>
        
      </div>
      
    </div>
  `;
  
  // Attach Day collapse triggers
  document.querySelectorAll(".timeline-day-header").forEach(header => {
    header.addEventListener("click", (e) => {
      // Prevent collapse when clicking "Add" button inside header
      if (e.target.closest(".btn-add-day-act")) return;
      
      const card = header.closest(".timeline-day-card");
      card.classList.toggle("collapsed");
    });
  });
  
  // Auto Fix Schedule trigger
  const fixBtn = document.getElementById("btn-fix-conflicts");
  if (fixBtn) {
    fixBtn.addEventListener("click", () => {
      fixTripSchedule(tripId);
      renderItinerary(tripId);
    });
  }
  
  // Sidebar Optimizer trigger
  document.getElementById("btn-sidebar-optimize").addEventListener("click", () => {
    optimizeTripBudget(tripId);
  });
  
  // Add stop trigger
  document.getElementById("btn-add-city-stop").addEventListener("click", () => {
    openAddStopModal(tripId);
  });
  
  // Add activity click actions
  document.querySelectorAll(".btn-add-day-act").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const day = parseInt(btn.getAttribute("data-day"));
      const stopId = btn.getAttribute("data-stop-id");
      openAddActivityModal(tripId, stopId, day);
    });
  });
  
  // Action Row clicks on activity items
  document.querySelectorAll(".activity-actions-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const taId = btn.getAttribute("data-ta-id");
      openActivityOptionsDropdown(taId, btn, tripId);
    });
  });
  
  // Card click triggers detailed details display
  document.querySelectorAll(".activity-detail-card").forEach(card => {
    card.addEventListener("click", () => {
      const taId = card.getAttribute("data-ta-id");
      const taObj = data.trip_activities.find(x => x.id === taId);
      if (taObj) {
        openActivityDetailsModal(taObj.activityId, taObj.id, tripId);
      }
    });
  });
}

// Dialog Modal showing curated discovery activities to select for a stop day
function openAddActivityModal(tripId, stopId, day) {
  const data = db.get();
  
  // If stopId is empty (e.g. general transit day), find matching stop
  let actualStop = data.trip_stops.find(s => s.id === stopId);
  if (!actualStop) {
    actualStop = data.trip_stops.find(s => s.tripId === tripId && s.days.includes(day));
  }
  
  if (!actualStop) {
    showToast("Invalid day selection stop.", "error");
    return;
  }
  
  const city = data.cities[actualStop.cityId];
  const cityActs = data.activities.filter(a => a.cityId === actualStop.cityId);
  
  const bodyHtml = `
    <div style="margin-bottom:16px;">
      <p style="color:var(--text-muted); font-size:0.9rem;">Select an activity to add to Day ${day} in <strong>${city ? city.name : 'this city'}</strong>.</p>
    </div>
    
    <div style="display:flex; flex-direction:column; gap:12px; max-height: 400px; overflow-y:auto; padding-right:4px;" id="modal-acts-scroller">
      ${cityActs.map(act => `
        <div style="display:flex; align-items:center; justify-content:space-between; border:1px solid var(--border-color); border-radius:var(--border-radius-md); padding:12px; background-color:var(--bg-main);">
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="${act.img}" style="width:50px; height:50px; object-fit:cover; border-radius:var(--border-radius-sm);">
            <div>
              <h5 style="margin:0; font-weight:700;">${act.name}</h5>
              <span style="font-size:0.75rem; color:var(--text-muted);">${act.duration} hrs • ₹${act.cost.toLocaleString()} • ${act.category}</span>
            </div>
          </div>
          <button class="btn btn-primary btn-sm btn-modal-select-act" data-act-id="${act.id}" style="padding:6px 12px; font-size:0.8rem;">Add</button>
        </div>
      `).join("")}
      
      <!-- Custom activity option creation -->
      <div style="border: 2px dashed var(--border-color); border-radius:var(--border-radius-md); padding:16px; text-align:center;">
        <h5 style="margin-bottom:4px; font-weight:700;">Custom Activity</h5>
        <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:12px;">Create a custom event with details.</p>
        <button class="btn btn-secondary btn-sm" id="btn-custom-act-wizard">Create Custom Event</button>
      </div>
    </div>
  `;
  
  const footerHtml = `<button class="btn btn-secondary" id="btn-modal-cancel">Cancel</button>`;
  
  const close = openModal(`Add Activity (Day ${day})`, bodyHtml, footerHtml);
  
  document.getElementById("btn-modal-cancel").addEventListener("click", close);
  
  // Custom action listener
  document.getElementById("btn-custom-act-wizard").addEventListener("click", () => {
    close();
    openCustomActivityWizardModal(tripId, actualStop.id, day);
  });
  
  // Curated items listeners
  document.querySelectorAll(".btn-modal-select-act").forEach(btn => {
    btn.addEventListener("click", () => {
      const actId = btn.getAttribute("data-act-id");
      
      // Default start time calculations based on current activities counts
      const tActs = data.trip_activities.filter(ta => ta.stopId === actualStop.id && ta.day === day);
      const defaultTime = tActs.length === 0 ? "10:00" : (tActs.length === 1 ? "14:30" : "19:00");
      
      data.trip_activities.push({
        id: `ta_${Date.now()}`,
        stopId: actualStop.id,
        activityId: actId,
        day: day,
        startTime: defaultTime
      });
      
      db.save(data);
      close();
      showToast("Activity added to your itinerary!", "success");
      renderItinerary(tripId);
    });
  });
}

// Dialog Wizard for Custom Activity creation
function openCustomActivityWizardModal(tripId, stopId, day) {
  const bodyHtml = `
    <div class="form-group">
      <label for="custom-act-name">Activity Title</label>
      <input type="text" id="custom-act-name" placeholder="e.g. Dinner at Le Meurice" required>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="custom-act-time">Start Time</label>
        <input type="time" id="custom-act-time" value="19:00">
      </div>
      <div class="form-group">
        <label for="custom-act-duration">Duration (Hours)</label>
        <input type="number" id="custom-act-duration" value="2" min="0.5" step="0.5">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="custom-act-cost">Cost (₹)</label>
        <input type="number" id="custom-act-cost" value="2000" min="0">
      </div>
      <div class="form-group">
        <label for="custom-act-category">Category</label>
        <select id="custom-act-category">
          <option value="Food">Food & Dining</option>
          <option value="Culture">Culture & Arts</option>
          <option value="Adventure">Adventure & Sports</option>
          <option value="Nature">Nature & Outdoors</option>
          <option value="Shopping">Shopping</option>
          <option value="History">Historical sights</option>
        </select>
      </div>
    </div>
  `;
  
  const footerHtml = `
    <button class="btn btn-secondary" id="btn-custom-cancel">Back</button>
    <button class="btn btn-primary" id="btn-custom-save">Save Activity</button>
  `;
  
  const close = openModal("Create Custom Activity", bodyHtml, footerHtml);
  
  document.getElementById("btn-custom-cancel").addEventListener("click", () => {
    close();
    openAddActivityModal(tripId, stopId, day);
  });
  
  document.getElementById("btn-custom-save").addEventListener("click", () => {
    const name = document.getElementById("custom-act-name").value.trim();
    const time = document.getElementById("custom-act-time").value;
    const dur = parseFloat(document.getElementById("custom-act-duration").value);
    const cost = parseFloat(document.getElementById("custom-act-cost").value);
    const cat = document.getElementById("custom-act-category").value;
    
    if (!name || isNaN(dur) || isNaN(cost)) {
      showToast("Please fill in valid details.", "error");
      return;
    }
    
    const data = db.get();
    
    // Create new global custom activity
    const customId = `act_custom_${Date.now()}`;
    const newAct = {
      id: customId,
      cityId: "custom", // tag as custom
      name: name,
      category: cat,
      duration: dur,
      cost: cost,
      rating: 5.0,
      img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80",
      description: "Custom user-generated activity."
    };
    
    data.activities.push(newAct);
    data.trip_activities.push({
      id: `ta_${Date.now()}`,
      stopId: stopId,
      activityId: customId,
      day: day,
      startTime: time
    });
    
    db.save(data);
    close();
    showToast("Custom activity saved!", "success");
    renderItinerary(tripId);
  });
}

// Dialog modal to add new stop city to current trip
function openAddStopModal(tripId) {
  const data = db.get();
  const trip = data.trips.find(t => t.id === tripId);
  const currentStops = data.trip_stops.filter(s => s.tripId === tripId);
  
  // Find cities not yet in stops
  const mappedIds = currentStops.map(s => s.cityId);
  const availableCities = Object.values(data.cities).filter(c => !mappedIds.includes(c.id));
  
  if (availableCities.length === 0) {
    showToast("All available cities are already added.", "warning");
    return;
  }
  
  const bodyHtml = `
    <div class="form-group">
      <label for="stop-city-select">Select Destination</label>
      <select id="stop-city-select">
        ${availableCities.map(c => `<option value="${c.id}">${c.name} (${c.country})</option>`).join("")}
      </select>
    </div>
    <div class="form-group">
      <label for="stop-days-count">How many days will you spend here?</label>
      <input type="number" id="stop-days-count" value="2" min="1" max="10">
    </div>
  `;
  
  const footerHtml = `
    <button class="btn btn-secondary" id="btn-stop-cancel">Cancel</button>
    <button class="btn btn-primary" id="btn-stop-save">Add Stop</button>
  `;
  
  const close = openModal("Add Stop City", bodyHtml, footerHtml);
  document.getElementById("btn-stop-cancel").addEventListener("click", close);
  
  document.getElementById("btn-stop-save").addEventListener("click", () => {
    const cityId = document.getElementById("stop-city-select").value;
    const addDays = parseInt(document.getElementById("stop-days-count").value);
    
    if (isNaN(addDays) || addDays <= 0) return;
    
    // Add Days to trip count
    const oldDaysCount = trip.daysCount;
    trip.daysCount += addDays;
    
    // Extend end date based on days added
    const eDate = new Date(trip.endDate);
    eDate.setDate(eDate.getDate() + addDays);
    trip.endDate = eDate.toISOString().split("T")[0];
    
    // Create stop stopId
    const newStopId = `stop_${Date.now()}`;
    const daysArr = [];
    for (let d = oldDaysCount + 1; d <= trip.daysCount; d++) daysArr.push(d);
    
    data.trip_stops.push({
      id: newStopId,
      tripId: tripId,
      cityId: cityId,
      days: daysArr
    });
    
    db.save(data);
    close();
    showToast(`Added stop. Trip extended to ${trip.daysCount} days.`, "success");
    renderItinerary(tripId);
  });
}

// Options menu logic (Edit / Delete / Move Day)
function openActivityOptionsDropdown(taId, triggerBtn, tripId) {
  const data = db.get();
  const taObj = data.trip_activities.find(x => x.id === taId);
  if (!taObj) return;
  
  // Close any existing options menu overlay
  const existing = document.getElementById("options-dropdown-overlay");
  if (existing) existing.remove();
  
  // Create absolute floating element
  const dropdown = document.createElement("div");
  dropdown.id = "options-dropdown-overlay";
  dropdown.style.position = "absolute";
  dropdown.style.backgroundColor = "var(--bg-card)";
  dropdown.style.border = "1px solid var(--border-color)";
  dropdown.style.borderRadius = "var(--border-radius-md)";
  dropdown.style.boxShadow = "var(--shadow-lg)";
  dropdown.style.padding = "8px 0";
  dropdown.style.zIndex = "10000";
  dropdown.style.width = "180px";
  
  // Append HTML actions
  dropdown.innerHTML = `
    <button class="dd-item btn-edit-time" style="display:flex; align-items:center; gap:10px; width:100%; border:none; background:none; padding:10px 16px; cursor:pointer; text-align:left; font-weight:600;"><i class="fa-solid fa-clock" style="color:var(--text-muted);"></i> Edit Time</button>
    <button class="dd-item btn-move-day" style="display:flex; align-items:center; gap:10px; width:100%; border:none; background:none; padding:10px 16px; cursor:pointer; text-align:left; font-weight:600;"><i class="fa-solid fa-calendar-day" style="color:var(--text-muted);"></i> Move to Day</button>
    <button class="dd-item btn-delete-act" style="display:flex; align-items:center; gap:10px; width:100%; border:none; background:none; padding:10px 16px; cursor:pointer; text-align:left; font-weight:600; color:var(--error);"><i class="fa-solid fa-trash-can" style="color:var(--error);"></i> Remove</button>
  `;
  
  document.body.appendChild(dropdown);
  
  // Positioning next to trigger
  const rect = triggerBtn.getBoundingClientRect();
  dropdown.style.top = `${rect.bottom + window.scrollY}px`;
  dropdown.style.left = `${rect.right - 180 + window.scrollX}px`;
  
  // Click away listener to close
  const clickAway = () => {
    dropdown.remove();
    document.removeEventListener("click", clickAway);
  };
  
  // Timeout prevents closing instantly on the same trigger click event
  setTimeout(() => {
    document.addEventListener("click", clickAway);
  }, 100);
  
  // Action: Edit Time
  dropdown.querySelector(".btn-edit-time").addEventListener("click", () => {
    dropdown.remove();
    openEditTimeModal(taId, tripId);
  });
  
  // Action: Move Day
  dropdown.querySelector(".btn-move-day").addEventListener("click", () => {
    dropdown.remove();
    openMoveDayModal(taId, tripId);
  });
  
  // Action: Delete activity
  dropdown.querySelector(".btn-delete-act").addEventListener("click", () => {
    dropdown.remove();
    data.trip_activities = data.trip_activities.filter(x => x.id !== taId);
    db.save(data);
    showToast("Activity removed from itinerary.", "success");
    renderItinerary(tripId);
  });
}

function openEditTimeModal(taId, tripId) {
  const data = db.get();
  const taObj = data.trip_activities.find(x => x.id === taId);
  const act = data.activities.find(a => a.id === taObj.activityId);
  
  const bodyHtml = `
    <div class="form-group">
      <label for="edit-act-time">Scheduled Start Time</label>
      <input type="time" id="edit-act-time" value="${taObj.startTime}">
    </div>
  `;
  
  const footerHtml = `
    <button class="btn btn-secondary" id="btn-time-cancel">Cancel</button>
    <button class="btn btn-primary" id="btn-time-save">Update Time</button>
  `;
  
  const close = openModal(`Reschedule — ${act ? act.name : 'Activity'}`, bodyHtml, footerHtml);
  document.getElementById("btn-time-cancel").addEventListener("click", close);
  
  document.getElementById("btn-time-save").addEventListener("click", () => {
    const time = document.getElementById("edit-act-time").value;
    if (time) {
      taObj.startTime = time;
      db.save(data);
      close();
      showToast("Time updated successfully!", "success");
      renderItinerary(tripId);
    }
  });
}

function openMoveDayModal(taId, tripId) {
  const data = db.get();
  const trip = data.trips.find(t => t.id === tripId);
  const taObj = data.trip_activities.find(x => x.id === taId);
  const act = data.activities.find(a => a.id === taObj.activityId);
  
  // Create day select options
  let options = "";
  for (let i = 1; i <= trip.daysCount; i++) {
    options += `<option value="${i}" ${taObj.day === i ? 'selected' : ''}>Day ${i}</option>`;
  }
  
  const bodyHtml = `
    <div class="form-group">
      <label for="edit-act-day">Select Day</label>
      <select id="edit-act-day">
        ${options}
      </select>
    </div>
  `;
  
  const footerHtml = `
    <button class="btn btn-secondary" id="btn-day-cancel">Cancel</button>
    <button class="btn btn-primary" id="btn-day-save">Move Activity</button>
  `;
  
  const close = openModal(`Change Day — ${act ? act.name : 'Activity'}`, bodyHtml, footerHtml);
  document.getElementById("btn-day-cancel").addEventListener("click", close);
  
  document.getElementById("btn-day-save").addEventListener("click", () => {
    const day = parseInt(document.getElementById("edit-act-day").value);
    
    // Find stop for the target day to adjust stopId mapping
    const stops = data.trip_stops.filter(s => s.tripId === tripId);
    const stop = stops.find(s => s.days.includes(day));
    
    if (stop) {
      taObj.day = day;
      taObj.stopId = stop.id;
      db.save(data);
      close();
      showToast(`Activity moved to Day ${day}!`, "success");
      renderItinerary(tripId);
    } else {
      showToast("Unable to move day.", "error");
    }
  });
}

function openActivityDetailsModal(activityId, taId, tripId) {
  const data = db.get();
  const act = data.activities.find(a => a.id === activityId);
  if (!act) return;
  
  const bodyHtml = `
    <div style="border-radius:var(--border-radius-md); overflow:hidden; margin-bottom:16px; height: 180px;">
      <img src="${act.img}" style="width:100%; height:100%; object-fit:cover;">
    </div>
    <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
      <span class="activity-tag"><i class="fa-regular fa-clock"></i> ${act.duration} hrs</span>
      <span class="activity-tag tag-cost">₹${act.cost.toLocaleString()}</span>
      <span class="activity-tag"><i class="fa-solid fa-star" style="color:var(--accent);"></i> ${act.rating}</span>
      <span class="activity-tag">${act.category}</span>
    </div>
    <h4 style="font-weight:800; font-size:1.15rem; margin-bottom:8px;">About the experience</h4>
    <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.5;">${act.description}</p>
  `;
  
  const footerHtml = `
    ${taId ? `<button class="btn btn-danger" id="btn-details-remove" style="margin-right:auto;">Remove</button>` : ''}
    <button class="btn btn-secondary" id="btn-details-close">Close</button>
  `;
  
  const close = openModal(act.name, bodyHtml, footerHtml);
  
  document.getElementById("btn-details-close").addEventListener("click", close);
  
  if (taId) {
    document.getElementById("btn-details-remove").addEventListener("click", () => {
      close();
      data.trip_activities = data.trip_activities.filter(x => x.id !== taId);
      db.save(data);
      showToast("Activity removed from itinerary.", "success");
      renderItinerary(tripId);
    });
  }
}

// --- 12. BUDGET ANALYZER VIEW CONTROLLER & UTILITIES ---
function updateBudgetUI() {
  const budgetInput = document.getElementById("budget-input");
  const accommodationInput = document.getElementById("input-accommodation");
  const transportInput = document.getElementById("input-transport");
  const foodInput = document.getElementById("input-food");
  const activitiesInput = document.getElementById("input-activities");
  const shoppingInput = document.getElementById("input-shopping");
  const otherInput = document.getElementById("input-other");
  
  if (!budgetInput) return; // Not currently on the budget page
  
  // Parse inputs and prevent negative values
  const budget = Math.max(0, Number(budgetInput.value) || 0);
  const accommodation = Math.max(0, Number(accommodationInput.value) || 0);
  const transport = Math.max(0, Number(transportInput.value) || 0);
  const food = Math.max(0, Number(foodInput.value) || 0);
  const activities = Math.max(0, Number(activitiesInput.value) || 0);
  const shopping = Math.max(0, Number(shoppingInput.value) || 0);
  const other = Math.max(0, Number(otherInput.value) || 0);
  
  // Calculations
  const estimatedCost = accommodation + transport + food + activities + shopping + other;
  const remaining = budget - estimatedCost;
  const usedPercentage = budget > 0 ? (estimatedCost / budget) * 100 : 0;
  
  // Update summary cards
  document.getElementById("estimated-cost-display").textContent = `₹${estimatedCost.toLocaleString()}`;
  
  const remainingEl = document.getElementById("remaining-budget-display");
  remainingEl.textContent = `₹${remaining.toLocaleString()}`;
  if (remaining >= 0) {
    remainingEl.style.color = "var(--success)";
  } else {
    remainingEl.style.color = "var(--error)";
  }
  
  document.getElementById("used-percentage-display").textContent = `${Math.round(usedPercentage)}%`;
  
  // Update top progress bar fill
  const topProgressFill = document.getElementById("top-budget-progress-fill");
  const topProgressPct = document.getElementById("top-budget-progress-pct");
  if (topProgressFill) {
    topProgressFill.style.width = `${Math.min(100, usedPercentage)}%`;
    if (usedPercentage > 100) {
      topProgressFill.style.backgroundColor = "var(--error)";
      topProgressPct.style.color = "var(--error)";
    } else if (usedPercentage >= 90) {
      topProgressFill.style.backgroundColor = "var(--warning)";
      topProgressPct.style.color = "var(--warning)";
    } else {
      topProgressFill.style.backgroundColor = "var(--primary)";
      topProgressPct.style.color = "var(--primary)";
    }
    topProgressPct.textContent = `${Math.round(usedPercentage)}%`;
  }
  
  // Update category progress bars & percentage labels
  const categories = [
    { id: "accommodation", val: accommodation, fillId: "fill-accommodation", pctId: "pct-accommodation" },
    { id: "transport", val: transport, fillId: "fill-transport", pctId: "pct-transport" },
    { id: "food", val: food, fillId: "fill-food", pctId: "pct-food" },
    { id: "activities", val: activities, fillId: "fill-activities", pctId: "pct-activities" },
    { id: "shopping", val: shopping, fillId: "fill-shopping", pctId: "pct-shopping" },
    { id: "other", val: other, fillId: "fill-other", pctId: "pct-other" }
  ];
  
  categories.forEach(cat => {
    const pct = budget > 0 ? (cat.val / budget) * 100 : 0;
    const fillEl = document.getElementById(cat.fillId);
    const pctEl = document.getElementById(cat.pctId);
    
    if (fillEl) fillEl.style.width = `${Math.min(100, pct)}%`;
    if (pctEl) pctEl.textContent = `${Math.round(pct)}%`;
  });
  
  // Update budget status recommendations & warning panel
  const statusCard = document.getElementById("budget-status-card");
  if (statusCard) {
    let headerClass = "within-budget";
    let statusMsg = "";
    let isOver = false;
    
    if (usedPercentage < 70) {
      statusMsg = "Excellent — plenty of budget remaining";
      headerClass = "within-budget";
    } else if (usedPercentage >= 70 && usedPercentage <= 90) {
      statusMsg = "Good — you're within your planned budget";
      headerClass = "within-budget";
    } else if (usedPercentage > 90 && usedPercentage <= 100) {
      statusMsg = "Watch your spending";
      headerClass = "caution-budget";
    } else {
      statusMsg = "Over budget — consider reducing optional expenses";
      headerClass = "over-budget";
      isOver = true;
    }
    
    let overDetails = "";
    if (isOver) {
      const overAmt = estimatedCost - budget;
      overDetails = `
        <div style="background-color: var(--error-light); border-radius: var(--border-radius-md); padding: 16px; border: 1px solid rgba(239, 68, 68, 0.25); margin-top: 16px; color: #991B1B;">
          <h4 style="font-weight: 700; margin-bottom: 6px;"><i class="fa-solid fa-triangle-exclamation" style="color:var(--error);"></i> Over Budget! Deficit: ₹${overAmt.toLocaleString()}</h4>
          <p style="font-size:0.85rem; line-height:1.4;">Your estimates exceed the plan. We suggest reducing optional categories such as Shopping or Other, or swapping high-cost itinerary activities.</p>
        </div>
      `;
    }
    
    let headerBg = "var(--success-light)";
    let headerColor = "#065F46";
    if (headerClass === "over-budget") {
      headerBg = "var(--error-light)";
      headerColor = "#991B1B";
    } else if (headerClass === "caution-budget") {
      headerBg = "var(--warning-light)";
      headerColor = "#92400E";
    }
    
    statusCard.innerHTML = `
      <div class="optimizer-banner-header" style="background-color: ${headerBg}; color: ${headerColor}; padding: 16px 24px; font-weight:700;">
        <i class="fa-solid ${headerClass === 'within-budget' ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i>
        <span>${statusMsg}</span>
      </div>
      <div class="optimizer-body" style="padding: 24px;">
        <p style="color:var(--text-muted); font-size:0.9rem; margin:0;">
          ${isOver ? 'Your travel expenses are above the set limit. Use our smart budget optimizer to automatically cut costs.' : 'Great job! Your planned trip expenses are within target bounds.'}
        </p>
        ${overDetails}
        <div style="margin-top: 16px;">
          <button class="btn btn-primary" id="btn-trigger-optimize" style="${isOver ? 'background-color:var(--error); border-color:var(--error);' : ''}">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Optimize My Trip
          </button>
        </div>
      </div>
    `;
    
    document.getElementById("btn-trigger-optimize").addEventListener("click", () => {
      const tripId = window.location.hash.split("/")[1];
      optimizeTripBudget(tripId);
    });
  }
  
  // Recalculate dynamic SVG segments
  const circumference = 2 * Math.PI * 80;
  const transportRatio = estimatedCost > 0 ? (transport / estimatedCost) : 0;
  const accommodationRatio = estimatedCost > 0 ? (accommodation / estimatedCost) : 0;
  const activitiesRatio = estimatedCost > 0 ? (activities / estimatedCost) : 0;
  const foodRatio = estimatedCost > 0 ? (food / estimatedCost) : 0;
  const shoppingRatio = estimatedCost > 0 ? (shopping / estimatedCost) : 0;
  const otherRatio = estimatedCost > 0 ? (other / estimatedCost) : 0;
  
  const lenTransport = transportRatio * circumference;
  const lenAccommodation = accommodationRatio * circumference;
  const lenActivities = activitiesRatio * circumference;
  const lenFood = foodRatio * circumference;
  const lenShopping = shoppingRatio * circumference;
  const lenOther = otherRatio * circumference;
  
  const circles = [
    { id: "circle-transport", len: lenTransport, offset: 0 },
    { id: "circle-accommodation", len: lenAccommodation, offset: -lenTransport },
    { id: "circle-activities", len: lenActivities, offset: -(lenTransport + lenAccommodation) },
    { id: "circle-food", len: lenFood, offset: -(lenTransport + lenAccommodation + lenActivities) },
    { id: "circle-shopping", len: lenShopping, offset: -(lenTransport + lenAccommodation + lenActivities + lenFood) },
    { id: "circle-other", len: lenOther, offset: -(lenTransport + lenAccommodation + lenActivities + lenFood + lenShopping) }
  ];
  
  circles.forEach(c => {
    const el = document.getElementById(c.id);
    if (el) {
      el.setAttribute("stroke-dasharray", `${c.len} ${circumference - c.len}`);
      el.setAttribute("stroke-dashoffset", c.offset);
    }
  });
  
  if (document.getElementById("donut-total-amount")) {
    document.getElementById("donut-total-amount").textContent = `₹${estimatedCost.toLocaleString()}`;
  }
  
  // Update Legend list totals
  const legends = [
    { val: transport, amtId: "legend-amt-transport", pctId: "legend-pct-transport", ratio: transportRatio },
    { val: accommodation, amtId: "legend-amt-accommodation", pctId: "legend-pct-accommodation", ratio: accommodationRatio },
    { val: activities, amtId: "legend-amt-activities", pctId: "legend-pct-activities", ratio: activitiesRatio },
    { val: food, amtId: "legend-amt-food", pctId: "legend-pct-food", ratio: foodRatio },
    { val: shopping, amtId: "legend-amt-shopping", pctId: "legend-pct-shopping", ratio: shoppingRatio },
    { val: other, amtId: "legend-amt-other", pctId: "legend-pct-other", ratio: otherRatio }
  ];
  
  legends.forEach(l => {
    const amtEl = document.getElementById(l.amtId);
    const pctEl = document.getElementById(l.pctId);
    if (amtEl) amtEl.textContent = `₹${l.val.toLocaleString()}`;
    if (pctEl) pctEl.textContent = `${Math.round(l.ratio * 100)}%`;
  });
  
  // Update Average Daily spending
  const hash = window.location.hash;
  const tripId = hash.split("/")[1];
  const trip = db.get().trips.find(t => t.id === tripId);
  if (trip && document.getElementById("avg-daily-cost")) {
    const avgDaily = Math.round(estimatedCost / trip.daysCount);
    document.getElementById("avg-daily-cost").textContent = `Average daily cost: ₹${avgDaily.toLocaleString()} / day`;
  }
}

function renderBudget(tripId) {
  const data = db.get();
  const trip = data.trips.find(t => t.id === tripId);
  if (!trip) return;
  
  const cost = calculateTripCost(tripId);
  const remaining = trip.budget - cost.total;
  const progressPct = Math.min(Math.round((cost.total / trip.budget) * 100), 100);
  const circumference = 2 * Math.PI * 80;
  
  mainContent.innerHTML = `
    <!-- Sticky tabs bar inside trip context -->
    <div class="trips-tabs-bar" style="margin-bottom: 24px;">
      <a href="#itinerary/${tripId}" class="trips-tab">Itinerary Builder</a>
      <a href="#budget/${tripId}" class="trips-tab active">Budget Analyzer</a>
      <a href="#calendar/${tripId}" class="trips-tab">Calendar View</a>
      <a href="#share/${tripId}" class="trips-tab"><i class="fa-solid fa-share-nodes"></i> Share Trip</a>
    </div>
    
    <div>
      <h1 style="font-size:2.25rem; font-weight:800; margin-bottom:24px;">Budget Analyzer</h1>
      
      <!-- Big summary figures cards row -->
      <div class="budget-summary-grid" style="grid-template-columns: repeat(4, 1fr);">
        <div class="budget-widget-card highlighted">
          <p>Total Budget Limit</p>
          <div style="display:flex; align-items:center; gap:4px; margin-top: 4px;">
            <span style="font-size:1.8rem; font-weight:800; color:var(--text-inverse);">₹</span>
            <input type="number" id="budget-input" value="${trip.budget}" min="0" style="font-size:1.8rem; font-weight:800; font-family:var(--font-heading); color:var(--text-inverse); background:none; border:none; width:100%; border-bottom:1.5px dashed rgba(255,255,255,0.6); outline:none;">
          </div>
          <i class="fa-solid fa-wallet widget-icon-bg"></i>
        </div>
        
        <div class="budget-widget-card">
          <p>Estimated Cost</p>
          <h3 id="estimated-cost-display" style="font-size: 2rem; font-weight: 800; margin-top: 4px;">₹${cost.total.toLocaleString()}</h3>
          <i class="fa-solid fa-tags widget-icon-bg"></i>
        </div>
        
        <div class="budget-widget-card">
          <p>Remaining Budget</p>
          <h3 id="remaining-budget-display" style="font-size: 2rem; font-weight: 800; margin-top: 4px; color:${remaining >= 0 ? 'var(--success)' : 'var(--error)'};">₹${remaining.toLocaleString()}</h3>
          <i class="fa-solid fa-hand-holding-dollar widget-icon-bg"></i>
        </div>
        
        <div class="budget-widget-card">
          <p>Budget Used %</p>
          <h3 id="used-percentage-display" style="font-size: 2rem; font-weight: 800; margin-top: 4px;">${progressPct}%</h3>
          <i class="fa-solid fa-chart-line widget-icon-bg"></i>
        </div>
      </div>
      
      <!-- Progress Bar widget -->
      <div class="upcoming-hero-card" style="padding:24px; margin-bottom:32px;">
        <div class="planning-progress-bar-wrapper">
          <div class="progress-labels">
            <span>Budget Utilization Track</span>
            <span id="top-budget-progress-pct" class="progress-percentage" style="font-weight:700;">${progressPct}%</span>
          </div>
          <div class="progress-track" style="height:12px;">
            <div id="top-budget-progress-fill" class="progress-fill" style="width: ${progressPct}%; background-color: ${cost.total > trip.budget ? 'var(--error)' : 'var(--primary)'}"></div>
          </div>
        </div>
      </div>
      
      <!-- Graph & Legends section -->
      <div class="budget-pie-section">
        
        <!-- SVG Donut Chart visual representation -->
        <div class="chart-visual-wrapper">
          <svg width="220" height="220" viewBox="0 0 220 220" style="transform: rotate(-90deg);">
            <!-- Background base circle -->
            <circle cx="110" cy="110" r="80" fill="transparent" stroke="#F3F4F6" stroke-width="20"></circle>
            
            <!-- Slice segment circles -->
            <circle id="circle-transport" cx="110" cy="110" r="80" fill="transparent" stroke="#3B82F6" stroke-width="20"></circle>
            <circle id="circle-accommodation" cx="110" cy="110" r="80" fill="transparent" stroke="var(--primary)" stroke-width="20"></circle>
            <circle id="circle-activities" cx="110" cy="110" r="80" fill="transparent" stroke="var(--success)" stroke-width="20"></circle>
            <circle id="circle-food" cx="110" cy="110" r="80" fill="transparent" stroke="var(--accent)" stroke-width="20"></circle>
            <circle id="circle-shopping" cx="110" cy="110" r="80" fill="transparent" stroke="#EC4899" stroke-width="20"></circle>
            <circle id="circle-other" cx="110" cy="110" r="80" fill="transparent" stroke="var(--text-muted)" stroke-width="20"></circle>
          </svg>
          <div class="chart-center-label">
            <span class="amount" id="donut-total-amount">₹${cost.total.toLocaleString()}</span>
            <span class="label">Total Cost</span>
          </div>
        </div>
        
        <!-- Interactive legend breakdown details -->
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color-label">
              <div class="legend-color-dot" style="background-color: var(--primary);"></div>
              <span>Accommodation</span>
            </div>
            <div class="legend-value-pct">
              <span id="legend-amt-accommodation">₹0</span>
              <span class="legend-pct" id="legend-pct-accommodation">0%</span>
            </div>
          </div>
          
          <div class="legend-item">
            <div class="legend-color-label">
              <div class="legend-color-dot" style="background-color: #3B82F6;"></div>
              <span>Transportation</span>
            </div>
            <div class="legend-value-pct">
              <span id="legend-amt-transport">₹0</span>
              <span class="legend-pct" id="legend-pct-transport">0%</span>
            </div>
          </div>
          
          <div class="legend-item">
            <div class="legend-color-label">
              <div class="legend-color-dot" style="background-color: var(--accent);"></div>
              <span>Food</span>
            </div>
            <div class="legend-value-pct">
              <span id="legend-amt-food">₹0</span>
              <span class="legend-pct" id="legend-pct-food">0%</span>
            </div>
          </div>
          
          <div class="legend-item">
            <div class="legend-color-label">
              <div class="legend-color-dot" style="background-color: var(--success);"></div>
              <span>Activities</span>
            </div>
            <div class="legend-value-pct">
              <span id="legend-amt-activities">₹0</span>
              <span class="legend-pct" id="legend-pct-activities">0%</span>
            </div>
          </div>
          
          <div class="legend-item">
            <div class="legend-color-label">
              <div class="legend-color-dot" style="background-color: #EC4899;"></div>
              <span>Shopping</span>
            </div>
            <div class="legend-value-pct">
              <span id="legend-amt-shopping">₹0</span>
              <span class="legend-pct" id="legend-pct-shopping">0%</span>
            </div>
          </div>
          
          <div class="legend-item">
            <div class="legend-color-label">
              <div class="legend-color-dot" style="background-color: var(--text-muted);"></div>
              <span>Other</span>
            </div>
            <div class="legend-value-pct">
              <span id="legend-amt-other">₹0</span>
              <span class="legend-pct" id="legend-pct-other">0%</span>
            </div>
          </div>
          
          <div id="avg-daily-cost" style="text-align:right; font-size:0.85rem; color:var(--text-muted); font-weight:600; padding-top:10px;">
            Average daily cost: ₹0 / day
          </div>
        </div>
        
      </div>
      
      <!-- Editable Category Fields panel -->
      <div class="upcoming-hero-card" style="padding:32px; display:flex; flex-direction:column; gap:20px; margin-top: 32px;">
        <h3 style="font-weight:700; font-size:1.25rem; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin:0;">Editable Expenses breakdown</h3>
        
        <div class="category-inputs-grid">
          <!-- Accommodation -->
          <div class="form-group" style="margin-bottom:0;">
            <label for="input-accommodation" style="display:flex; justify-content:space-between; font-weight:600;">
              <span>Accommodation</span>
              <span id="pct-accommodation" style="font-size:0.85rem; color:var(--text-muted); font-weight:500;">0%</span>
            </label>
            <div class="category-input-wrapper">
              <span style="font-weight:600; color:var(--text-light);">₹</span>
              <input type="number" id="input-accommodation" value="${cost.accommodation}" min="0" class="category-input-field">
            </div>
            <div class="category-progress-track">
              <div class="category-progress-fill" id="fill-accommodation" style="width:0%; background-color:var(--primary);"></div>
            </div>
          </div>
          
          <!-- Transportation -->
          <div class="form-group" style="margin-bottom:0;">
            <label for="input-transport" style="display:flex; justify-content:space-between; font-weight:600;">
              <span>Transportation</span>
              <span id="pct-transport" style="font-size:0.85rem; color:var(--text-muted); font-weight:500;">0%</span>
            </label>
            <div class="category-input-wrapper">
              <span style="font-weight:600; color:var(--text-light);">₹</span>
              <input type="number" id="input-transport" value="${cost.transport}" min="0" class="category-input-field">
            </div>
            <div class="category-progress-track">
              <div class="category-progress-fill" id="fill-transport" style="width:0%; background-color:#3B82F6;"></div>
            </div>
          </div>
          
          <!-- Food -->
          <div class="form-group" style="margin-bottom:0;">
            <label for="input-food" style="display:flex; justify-content:space-between; font-weight:600;">
              <span>Food</span>
              <span id="pct-food" style="font-size:0.85rem; color:var(--text-muted); font-weight:500;">0%</span>
            </label>
            <div class="category-input-wrapper">
              <span style="font-weight:600; color:var(--text-light);">₹</span>
              <input type="number" id="input-food" value="${cost.food}" min="0" class="category-input-field">
            </div>
            <div class="category-progress-track">
              <div class="category-progress-fill" id="fill-food" style="width:0%; background-color:var(--accent);"></div>
            </div>
          </div>
          
          <!-- Activities (Calculated, read-only) -->
          <div class="form-group" style="margin-bottom:0;">
            <label for="input-activities" style="display:flex; justify-content:space-between; font-weight:600;">
              <span>Activities (Calculated from Itinerary) <i class="fa-solid fa-lock" style="font-size:0.75rem; color:var(--text-light);"></i></span>
              <span id="pct-activities" style="font-size:0.85rem; color:var(--text-muted); font-weight:500;">0%</span>
            </label>
            <div class="category-input-wrapper" style="opacity:0.7; cursor:not-allowed;">
              <span style="font-weight:600; color:var(--text-light);">₹</span>
              <input type="number" id="input-activities" value="${cost.activities}" disabled class="category-input-field" style="cursor:not-allowed;">
            </div>
            <div class="category-progress-track">
              <div class="category-progress-fill" id="fill-activities" style="width:0%; background-color:var(--success);"></div>
            </div>
          </div>
          
          <!-- Shopping -->
          <div class="form-group" style="margin-bottom:0;">
            <label for="input-shopping" style="display:flex; justify-content:space-between; font-weight:600;">
              <span>Shopping</span>
              <span id="pct-shopping" style="font-size:0.85rem; color:var(--text-muted); font-weight:500;">0%</span>
            </label>
            <div class="category-input-wrapper">
              <span style="font-weight:600; color:var(--text-light);">₹</span>
              <input type="number" id="input-shopping" value="${cost.shopping !== undefined ? cost.shopping : 0}" min="0" class="category-input-field">
            </div>
            <div class="category-progress-track">
              <div class="category-progress-fill" id="fill-shopping" style="width:0%; background-color:#EC4899;"></div>
            </div>
          </div>
          
          <!-- Other -->
          <div class="form-group" style="margin-bottom:0;">
            <label for="input-other" style="display:flex; justify-content:space-between; font-weight:600;">
              <span>Other</span>
              <span id="pct-other" style="font-size:0.85rem; color:var(--text-muted); font-weight:500;">0%</span>
            </label>
            <div class="category-input-wrapper">
              <span style="font-weight:600; color:var(--text-light);">₹</span>
              <input type="number" id="input-other" value="${cost.other !== undefined ? cost.other : 0}" min="0" class="category-input-field">
            </div>
            <div class="category-progress-track">
              <div class="category-progress-fill" id="fill-other" style="width:0%; background-color:var(--text-muted);"></div>
            </div>
          </div>
        </div>
        
        <!-- Save Button -->
        <div style="text-align:right; margin-top:12px; border-top:1px solid var(--border-color); padding-top:20px;">
          <button class="btn btn-primary" id="btn-save-budget" style="padding:12px 28px;">
            <i class="fa-solid fa-floppy-disk"></i> Save Budget
          </button>
        </div>
      </div>
      
      <!-- Optimizer panel -->
      <div class="budget-optimizer-card" id="budget-status-card" style="margin-top: 32px;">
        <!-- Filled dynamically -->
      </div>
      
    </div>
  `;
  
  // Attach change listeners to update calculations dynamically as user edits values
  const textInputs = [
    "budget-input",
    "input-accommodation",
    "input-transport",
    "input-food",
    "input-shopping",
    "input-other"
  ];
  textInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", updateBudgetUI);
    }
  });
  
  // Initial draw
  updateBudgetUI();
  
  // Save Button trigger committing state back to LocalStorage
  document.getElementById("btn-save-budget").addEventListener("click", () => {
    const data = db.get();
    const tObj = data.trips.find(t => t.id === tripId);
    
    if (tObj) {
      tObj.budget = Math.max(0, Number(document.getElementById("budget-input").value) || 0);
      tObj.accommodationCost = Math.max(0, Number(document.getElementById("input-accommodation").value) || 0);
      tObj.transportCost = Math.max(0, Number(document.getElementById("input-transport").value) || 0);
      tObj.foodCost = Math.max(0, Number(document.getElementById("input-food").value) || 0);
      tObj.shoppingCost = Math.max(0, Number(document.getElementById("input-shopping").value) || 0);
      tObj.otherCost = Math.max(0, Number(document.getElementById("input-other").value) || 0);
      
      db.save(data);
      showToast("Budget updated successfully.", "success");
      updateBudgetUI();
    }
  });
}

// --- 13. CALENDAR VIEW CONTROLLER ---
let calendarYear = 2026;
let calendarMonth = 8; // September (0-indexed base)

function renderCalendar(tripId) {
  const data = db.get();
  
  // If tripId is passed, render specific trip calendar, otherwise render active user default dashboard
  const trip = tripId ? data.trips.find(t => t.id === tripId) : data.trips[0];
  
  if (!trip) {
    mainContent.innerHTML = `
      <div class="empty-list-state">
        <i class="fa-solid fa-calendar-xmark"></i>
        <h3>No Scheduled Calendars</h3>
        <button class="btn btn-primary" onclick="window.location.hash='#create-trip'">+ Plan a Trip</button>
      </div>
    `;
    return;
  }
  
  // Sync starting calendar view month with trip's startDate
  if (tripId) {
    const sDate = new Date(trip.startDate);
    calendarYear = sDate.getFullYear();
    calendarMonth = sDate.getMonth();
  }
  
  renderCalendarGrid(trip.id);
}

function renderCalendarGrid(tripId) {
  const data = db.get();
  const trip = data.trips.find(t => t.id === tripId);
  const stops = data.trip_stops.filter(s => s.tripId === tripId);
  const stopIds = stops.map(s => s.id);
  const tActivities = data.trip_activities.filter(ta => stopIds.includes(ta.stopId));
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Retrieve days layout grid
  const days = getMonthData(calendarYear, calendarMonth);
  
  // Map date bounds
  const startDateObj = new Date(trip.startDate);
  const endDateObj = new Date(trip.endDate);
  
  let gridCellsHtml = "";
  days.forEach(day => {
    const cellDate = new Date(calendarYear, day.month, day.day);
    
    // Check if cell falls within trip dates
    const isTripDay = cellDate >= startDateObj && cellDate <= endDateObj;
    
    // Calculate Day Index Number
    let dayIndex = 0;
    if (isTripDay) {
      const diffTime = Math.abs(cellDate - startDateObj);
      dayIndex = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    
    // Retrieve day's scheduled activities
    const dayActs = isTripDay ? tActivities.filter(ta => ta.day === dayIndex) : [];
    
    let eventsHtml = "";
    if (dayActs.length > 0) {
      eventsHtml = dayActs.map(ta => {
        const act = data.activities.find(a => a.id === ta.activityId);
        if (!act) return "";
        const catClass = act.category.toLowerCase() + "-event";
        return `
          <div class="calendar-event-item ${catClass}" data-ta-id="${ta.id}">
            ${ta.startTime} ${act.name}
          </div>
        `;
      }).join("");
    }
    
    // Highlights today's cell matching system date
    const today = new Date();
    const isToday = cellDate.getDate() === today.getDate() && cellDate.getMonth() === today.getMonth() && cellDate.getFullYear() === today.getFullYear();
    
    gridCellsHtml += `
      <div class="calendar-day-cell ${day.isOtherMonth ? 'other-month' : ''} ${isTripDay ? 'trip-active-cell' : ''}" 
        style="${isTripDay ? 'background-color: var(--primary-light);' : ''}" data-day="${dayIndex}" data-date="${cellDate.toISOString().split("T")[0]}">
        <span class="day-num-label" style="${isTripDay ? 'color: var(--primary); font-weight:700;' : ''}">${day.day}</span>
        
        ${isTripDay ? `<span style="font-size: 0.65rem; color: var(--primary); font-weight:600; position:absolute; top:8px; right:8px;">Day ${dayIndex}</span>` : ''}
        
        <div class="calendar-cell-events-list">
          ${eventsHtml}
        </div>
      </div>
    `;
  });
  
  const layoutHtml = `
    <!-- Sticky tabs bar inside trip context -->
    <div class="trips-tabs-bar" style="margin-bottom: 24px;">
      <a href="#itinerary/${tripId}" class="trips-tab">Itinerary Builder</a>
      <a href="#budget/${tripId}" class="trips-tab">Budget Analyzer</a>
      <a href="#calendar/${tripId}" class="trips-tab active">Calendar View</a>
      <a href="#share/${tripId}" class="trips-tab"><i class="fa-solid fa-share-nodes"></i> Share Trip</a>
    </div>
    
    <div class="calendar-view-card">
      <div class="calendar-header-row">
        
        <div class="calendar-nav-controls">
          <button class="btn btn-secondary btn-icon" id="btn-cal-prev"><i class="fa-solid fa-chevron-left"></i></button>
          <span class="calendar-title">${monthNames[calendarMonth]} ${calendarYear}</span>
          <button class="btn btn-secondary btn-icon" id="btn-cal-next"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        
        <div style="font-size:0.95rem; font-weight:600; color:var(--text-muted);">
          Active Trip: <strong>${trip.name}</strong> (${trip.daysCount} Days)
        </div>
      </div>
      
      <div class="calendar-grid">
        <div class="calendar-weekday-header">MON</div>
        <div class="calendar-weekday-header">TUE</div>
        <div class="calendar-weekday-header">WED</div>
        <div class="calendar-weekday-header">THU</div>
        <div class="calendar-weekday-header">FRI</div>
        <div class="calendar-weekday-header">SAT</div>
        <div class="calendar-weekday-header">SUN</div>
        
        ${gridCellsHtml}
      </div>
    </div>
  `;
  
  mainContent.innerHTML = layoutHtml;
  
  // Prev/Next Month navigation bindings
  document.getElementById("btn-cal-prev").addEventListener("click", () => {
    calendarMonth--;
    if (calendarMonth < 0) {
      calendarMonth = 11;
      calendarYear--;
    }
    renderCalendarGrid(tripId);
  });
  
  document.getElementById("btn-cal-next").addEventListener("click", () => {
    calendarMonth++;
    if (calendarMonth > 11) {
      calendarMonth = 0;
      calendarYear++;
    }
    renderCalendarGrid(tripId);
  });
  
  // Click cell actions (Opens Day summary popup modals)
  document.querySelectorAll(".calendar-day-cell.trip-active-cell").forEach(cell => {
    cell.addEventListener("click", (e) => {
      // Prevent double trigger when clicking individual event node
      if (e.target.closest(".calendar-event-item")) return;
      
      const day = parseInt(cell.getAttribute("data-day"));
      const dateStr = cell.getAttribute("data-date");
      openCalendarDayDetails(tripId, day, dateStr);
    });
  });
  
  // Event node click event triggers detail display
  document.querySelectorAll(".calendar-event-item").forEach(node => {
    node.addEventListener("click", (e) => {
      e.stopPropagation();
      const taId = node.getAttribute("data-ta-id");
      const taObj = data.trip_activities.find(x => x.id === taId);
      if (taObj) {
        openActivityDetailsModal(taObj.activityId, taObj.id, tripId);
      }
    });
  });
}

function openCalendarDayDetails(tripId, day, dateString) {
  const data = db.get();
  const stops = data.trip_stops.filter(s => s.tripId === tripId);
  const stopIds = stops.map(s => s.id);
  const stop = stops.find(s => s.days.includes(day));
  const city = stop ? data.cities[stop.cityId] : null;
  
  const dayActs = data.trip_activities.filter(ta => stopIds.includes(ta.stopId) && ta.day === day);
  dayActs.sort((a, b) => a.startTime.localeCompare(b.startTime));
  
  const formattedDate = new Date(dateString).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const dailyCost = dayActs.reduce((acc, curr) => acc + (data.activities.find(a => a.id === curr.activityId)?.cost || 0), 0);
  
  const bodyHtml = `
    <div style="margin-bottom:16px;">
      <h4 style="margin:0; font-weight:700; font-size:1.1rem;">${city ? city.name : 'Transit Stop'}</h4>
      <span style="font-size:0.85rem; color:var(--text-muted);">${formattedDate}</span>
    </div>
    
    <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:16px;">
      ${dayActs.map(ta => {
        const act = data.activities.find(a => a.id === ta.activityId);
        return `
          <div style="display:flex; align-items:center; justify-content:space-between; padding:10px; border:1px solid var(--border-color); border-radius:var(--border-radius-sm); background-color:var(--bg-main);">
            <div>
              <span style="font-weight:700; font-size:0.9rem;">${ta.startTime} • ${act ? act.name : 'Activity'}</span>
              <span style="display:block; font-size:0.75rem; color:var(--text-muted);">${act ? act.duration : '0'} hrs • ₹${act ? act.cost.toLocaleString() : '0'}</span>
            </div>
            <button class="btn btn-secondary btn-icon btn-modal-edit-time" data-ta-id="${ta.id}" style="width:28px; height:28px;"><i class="fa-solid fa-pencil" style="font-size:0.75rem;"></i></button>
          </div>
        `;
      }).join("")}
      ${dayActs.length === 0 ? `<p style="color:var(--text-muted); font-size:0.9rem;">No activities scheduled.</p>` : ''}
    </div>
    <div style="border-top:1px solid var(--border-color); padding-top:12px; display:flex; justify-content:space-between; font-weight:700; font-size:0.95rem;">
      <span>Day Total:</span>
      <span style="color:var(--success);">₹${dailyCost.toLocaleString()}</span>
    </div>
  `;
  
  const footerHtml = `
    <button class="btn btn-secondary" id="btn-cal-modal-close">Close</button>
    <button class="btn btn-primary" id="btn-cal-modal-add">+ Add Activity</button>
  `;
  
  const close = openModal(`Day ${day} Overview`, bodyHtml, footerHtml);
  document.getElementById("btn-cal-modal-close").addEventListener("click", close);
  
  // Modal inner edit trigger
  document.querySelectorAll(".btn-modal-edit-time").forEach(btn => {
    btn.addEventListener("click", () => {
      close();
      const taId = btn.getAttribute("data-ta-id");
      openEditTimeModal(taId, tripId);
    });
  });
  
  document.getElementById("btn-cal-modal-add").addEventListener("click", () => {
    close();
    openAddActivityModal(tripId, stop ? stop.id : "", day);
  });
}

// --- 14. MY TRIPS VIEW CONTROLLER ---
function renderMyTrips() {
  const data = db.get();
  
  const upcomingTrips = data.trips; // Seed data maps ongoing and upcoming together
  
  let gridHtml = "";
  if (upcomingTrips.length > 0) {
    gridHtml = upcomingTrips.map(trip => {
      const stops = data.trip_stops.filter(s => s.tripId === trip.id);
      const route = stops.map(s => data.cities[s.cityId]?.name || s.cityId).join(" → ");
      const cost = calculateTripCost(trip.id);
      
      return `
        <div class="trip-card">
          <div class="trip-card-cover" style="background-image: url('${trip.coverImg}')">
            <span class="trip-card-status-badge">UPCOMING</span>
            <div class="trip-card-title">
              <h3>${trip.name}</h3>
            </div>
          </div>
          <div class="trip-card-body">
            <div class="trip-card-meta-list">
              <div>
                <span>Dates</span>
                ${formatDateRange(trip.startDate, trip.endDate)}
              </div>
              <div>
                <span>Stops</span>
                ${route}
              </div>
              <div>
                <span>Budget</span>
                ₹${trip.budget.toLocaleString()}
              </div>
              <div>
                <span>Est. Cost</span>
                <span style="color: ${cost.total > trip.budget ? 'var(--error)' : 'var(--success)'}; font-weight:700;">₹${cost.total.toLocaleString()}</span>
              </div>
            </div>
            
            <div class="trip-card-actions">
              <button class="btn btn-primary" onclick="window.location.hash='#itinerary/${trip.id}'">View Plan</button>
              <button class="btn btn-danger btn-icon btn-delete-trip" data-id="${trip.id}"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  } else {
    gridHtml = `
      <div class="empty-list-state" style="grid-column: span 3;">
        <i class="fa-solid fa-plane-slash"></i>
        <h3>No trips planned yet</h3>
        <p>Start planning your next destination stops sequence!</p>
        <button class="btn btn-primary" onclick="window.location.hash='#create-trip'">+ Plan a Trip</button>
      </div>
    `;
  }
  
  mainContent.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:28px;">
      <h1 style="font-size:2.25rem; font-weight:800;">My Travel Itineraries</h1>
      <button class="btn btn-primary" onclick="window.location.hash='#create-trip'">+ Plan a Trip</button>
    </div>
    
    <div class="trips-tabs-bar">
      <span class="trips-tab active">Upcoming & Ongoing</span>
      <span class="trips-tab">Completed</span>
    </div>
    
    <div class="trips-grid">
      ${gridHtml}
    </div>
  `;
  
  // Attach trip delete triggers
  document.querySelectorAll(".btn-delete-trip").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this trip itinerary?")) {
        const dbData = db.get();
        dbData.trips = dbData.trips.filter(t => t.id !== id);
        dbData.trip_stops = dbData.trip_stops.filter(s => s.tripId !== id);
        // Clean up stops activities
        const stopIds = dbData.trip_stops.filter(s => s.tripId === id).map(s => s.id);
        dbData.trip_activities = dbData.trip_activities.filter(ta => !stopIds.includes(ta.stopId));
        
        db.save(dbData);
        showToast("Trip deleted.", "warning");
        renderMyTrips();
      }
    });
  });
}

// --- 15. EXPLORE VIEW CONTROLLER ---
function renderExplore() {
  const data = db.get();
  
  // Parse query params for search redirection from global search
  const hash = window.location.hash;
  let preQuery = "";
  if (hash.includes("?search=")) {
    preQuery = decodeURIComponent(hash.split("?search=")[1]);
  }
  
  mainContent.innerHTML = `
    <div class="discovery-layout">
      <div>
        <h1 style="font-size:2.25rem; font-weight:800; margin-bottom:4px;">Explore Destinations</h1>
        <p style="color:var(--text-muted);">Discover global cities, attractions, and cultural experiences.</p>
      </div>
      
      <!-- Filters and Search panel -->
      <div class="discovery-filters-row">
        <div class="hero-search-wrapper" style="width: 320px; margin-top:0;">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input type="text" id="explore-search-input" placeholder="Search cities or activities..." value="${preQuery}">
        </div>
        
        <div class="discovery-filter-tabs">
          <button class="filter-tab-btn active" data-cat="all">All Items</button>
          <button class="filter-tab-btn" data-cat="Culture">Culture</button>
          <button class="filter-tab-btn" data-cat="Food">Food</button>
          <button class="filter-tab-btn" data-cat="Adventure">Adventure</button>
          <button class="filter-tab-btn" data-cat="Nature">Nature</button>
        </div>
      </div>
      
      <!-- Combined grid (Cities first, then Activities matches) -->
      <div>
        <h3 style="font-size:1.35rem; margin-bottom:16px;" id="explore-cities-label">Cities Match</h3>
        <div class="discovery-grid" id="explore-cities-grid" style="margin-bottom:40px;">
          <!-- Dynamically populated cities -->
        </div>
        
        <h3 style="font-size:1.35rem; margin-bottom:16px;" id="explore-acts-label">Top Activities</h3>
        <div class="discovery-grid" id="explore-acts-grid">
          <!-- Dynamically populated activities -->
        </div>
      </div>
    </div>
  `;
  
  // Perform filter queries
  const doQuery = () => {
    const q = document.getElementById("explore-search-input").value.toLowerCase();
    const activeTab = document.querySelector(".filter-tab-btn.active").getAttribute("data-cat");
    
    // Filter Cities
    const matchedCities = Object.values(data.cities).filter(c => 
      c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
    );
    
    const citiesGrid = document.getElementById("explore-cities-grid");
    if (matchedCities.length > 0 && activeTab === "all") {
      document.getElementById("explore-cities-label").style.display = "block";
      citiesGrid.style.display = "grid";
      citiesGrid.innerHTML = matchedCities.map(city => `
        <div class="popular-card" onclick="window.location.hash='#create-trip'">
          <div class="popular-img-wrapper" style="height: 180px;">
            <img src="${city.img}" alt="${city.name}">
            <div class="popular-card-rating">
              <i class="fa-solid fa-star"></i>
              <span>${city.rating}</span>
            </div>
          </div>
          <div class="popular-card-info" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h4 style="margin:0;">${city.name}</h4>
              <p style="margin:0; font-size:0.8rem;">${city.country}</p>
            </div>
            <button class="btn btn-primary btn-sm" style="padding:6px 12px; font-size:0.8rem;">Plan Trip</button>
          </div>
        </div>
      `).join("");
    } else {
      document.getElementById("explore-cities-label").style.display = "none";
      citiesGrid.style.display = "none";
    }
    
    // Filter Activities
    let matchedActs = data.activities;
    if (q) {
      matchedActs = matchedActs.filter(a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
    }
    if (activeTab !== "all") {
      matchedActs = matchedActs.filter(a => a.category === activeTab);
    }
    
    const actsGrid = document.getElementById("explore-acts-grid");
    if (matchedActs.length > 0) {
      document.getElementById("explore-acts-label").style.display = "block";
      actsGrid.style.display = "grid";
      actsGrid.innerHTML = matchedActs.map(act => {
        const cObj = data.cities[act.cityId] || { name: "Custom" };
        return `
          <div class="activity-discover-card" data-id="${act.id}">
            <div class="discover-card-img-wrapper">
              <img src="${act.img}">
              <span class="discover-card-category">${act.category}</span>
              <div class="discover-card-rating"><i class="fa-solid fa-star"></i> ${act.rating}</div>
            </div>
            <div class="discover-card-body">
              <div>
                <span style="font-size:0.75rem; color:var(--primary); font-weight:700; text-transform:uppercase;">${cObj.name}</span>
                <h4 style="margin:2px 0 6px 0;">${act.name}</h4>
                <p class="discover-card-desc">${act.description}</p>
              </div>
              <div class="discover-card-footer">
                <div class="discover-price-time">
                  <span class="discover-price">₹${act.cost.toLocaleString()}</span>
                  <span class="discover-time">${act.duration} hrs</span>
                </div>
                <button class="btn btn-secondary btn-sm btn-discover-view-details" data-id="${act.id}">View Details</button>
              </div>
            </div>
          </div>
        `;
      }).join("");
      
      // Detail buttons click triggers
      actsGrid.querySelectorAll(".btn-discover-view-details").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const actId = btn.getAttribute("data-id");
          openActivityDetailsModal(actId);
        });
      });
      
    } else {
      document.getElementById("explore-acts-label").style.display = "none";
      actsGrid.style.display = "none";
      if (matchedCities.length === 0) {
        citiesGrid.style.display = "block";
        citiesGrid.innerHTML = `
          <div class="empty-list-state" style="grid-column: span 3;">
            <i class="fa-solid fa-magnifying-glass-minus"></i>
            <h3>No matches found</h3>
            <p>Try searching for general keywords or other destination names.</p>
          </div>
        `;
      }
    }
  };
  
  // Binding search filter actions
  document.getElementById("explore-search-input").addEventListener("input", doQuery);
  
  document.querySelectorAll(".filter-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      doQuery();
    });
  });
  
  // Initial fire
  doQuery();
}

// --- 16. COMMUNITY VIEW CONTROLLER ---
function renderCommunity() {
  const data = db.get();
  
  // Seed/Render a few public trips representing community shared items
  const communityTrips = [
    {
      id: "trip_italy_escapade",
      name: "Italian Escapade",
      route: "Rome → Florence → Venice",
      duration: 8,
      budget: 75000,
      coverImg: "https://images.unsplash.com/photo-1542820229-081e0c12af0b?auto=format&fit=crop&w=400&q=80",
      views: 1250,
      likes: 421,
      attribution: "Marco Polo",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "trip_japan_heritage",
      name: "Japanese Heritage",
      route: "Tokyo → Kyoto → Osaka",
      duration: 10,
      budget: 150000,
      coverImg: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
      views: 3410,
      likes: 984,
      attribution: "Yuki Tanaka",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: "trip_europe_adventure", // Link to our seeded adventure
      name: "Europe Adventure",
      route: "Paris → Rome",
      duration: 6,
      budget: 60000,
      coverImg: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80",
      views: 342,
      likes: 89,
      attribution: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  ];
  
  mainContent.innerHTML = `
    <div>
      <h1 style="font-size:2.25rem; font-weight:800; margin-bottom:4px;">Community Itineraries</h1>
      <p style="color:var(--text-muted); margin-bottom:28px;">Clone and customize itineraries shared by premium globetrotters.</p>
      
      <div class="trips-grid">
        ${communityTrips.map(trip => `
          <div class="trip-card">
            <div class="trip-card-cover" style="background-image: url('${trip.coverImg}')">
              <div class="trip-card-title">
                <h3>${trip.name}</h3>
              </div>
            </div>
            
            <div class="trip-card-body">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                <img src="${trip.avatar}" style="width:24px; height:24px; border-radius:50%;">
                <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">Shared by ${trip.attribution}</span>
              </div>
              
              <div class="trip-card-meta-list">
                <div>
                  <span>Route</span>
                  ${trip.route}
                </div>
                <div>
                  <span>Duration</span>
                  ${trip.duration} Days
                </div>
                <div>
                  <span>Estimated Budget</span>
                  ₹${trip.budget.toLocaleString()}
                </div>
                <div>
                  <span>Engagement</span>
                  <span style="font-size:0.85rem;"><i class="fa-regular fa-eye"></i> ${trip.views} • <i class="fa-regular fa-heart"></i> ${trip.likes}</span>
                </div>
              </div>
              
              <div class="trip-card-actions">
                <button class="btn btn-primary btn-clone-trip" data-id="${trip.id}">Copy Trip</button>
                <button class="btn btn-secondary btn-view-public-preview" data-id="${trip.id}">Preview</button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
  
  // Clone Trip click event listener
  document.querySelectorAll(".btn-clone-trip").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      cloneCommunityTrip(id);
    });
  });
  
  // Preview click event listener
  document.querySelectorAll(".btn-view-public-preview").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      window.location.hash = `#share/${id}`;
    });
  });
}

function cloneCommunityTrip(communityTripId) {
  const data = db.get();
  
  // Mock cloning for non-seeded ones
  if (communityTripId === "trip_italy_escapade" || communityTripId === "trip_japan_heritage") {
    // Generate new local trip object
    const newId = `trip_clone_${Date.now()}`;
    const newTrip = {
      id: newId,
      name: communityTripId === "trip_italy_escapade" ? "My Italy Escapade Copy" : "My Japan Heritage Copy",
      startDate: "2026-10-05",
      endDate: communityTripId === "trip_italy_escapade" ? "2026-10-12" : "2026-10-14",
      daysCount: communityTripId === "trip_italy_escapade" ? 8 : 10,
      budget: communityTripId === "trip_italy_escapade" ? 75000 : 150000,
      description: "Cloned from community dashboard template.",
      coverImg: communityTripId === "trip_italy_escapade" ? "https://images.unsplash.com/photo-1542820229-081e0c12af0b?auto=format&fit=crop&w=400&q=80" : "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
      travelStyle: "Balanced",
      interests: ["Culture", "Food"],
      isPublic: false,
      stats: { views: 0, likes: 0 },
      transportCost: communityTripId === "trip_italy_escapade" ? 18000 : 35000,
      accommodationCost: communityTripId === "trip_italy_escapade" ? 24000 : 50000,
      foodCost: communityTripId === "trip_italy_escapade" ? 12000 : 20000
    };
    
    // Create stops cities
    const stops = [];
    if (communityTripId === "trip_italy_escapade") {
      stops.push(
        { id: `stop_${Date.now()}_1`, tripId: newId, cityId: "rome", days: [1, 2, 3] },
        { id: `stop_${Date.now()}_2`, tripId: newId, cityId: "florence", days: [4, 5, 6, 7, 8] }
      );
    } else {
      stops.push(
        { id: `stop_${Date.now()}_1`, tripId: newId, cityId: "tokyo", days: [1, 2, 3, 4, 5] }
      );
    }
    
    // Add default activities
    const acts = [];
    stops.forEach(st => {
      const matched = data.activities.filter(a => a.cityId === st.cityId);
      st.days.forEach((day, idx) => {
        const sel = matched[idx % matched.length];
        if (sel) {
          acts.push({
            id: `ta_${Date.now()}_${idx}`,
            stopId: st.id,
            activityId: sel.id,
            day: day,
            startTime: "10:00"
          });
        }
      });
    });
    
    data.trips.unshift(newTrip);
    data.trip_stops.push(...stops);
    data.trip_activities.push(...acts);
    
  } else {
    // Clone our ownseeded trip
    const srcTrip = data.trips.find(t => t.id === communityTripId);
    if (!srcTrip) return;
    
    const newId = `trip_clone_${Date.now()}`;
    const newTrip = { ...srcTrip, id: newId, name: `${srcTrip.name} Copy`, isPublic: false };
    
    const srcStops = data.trip_stops.filter(s => s.tripId === communityTripId);
    const stopMappings = {};
    const newStops = srcStops.map(stop => {
      const nsId = `stop_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
      stopMappings[stop.id] = nsId;
      return { ...stop, id: nsId, tripId: newId };
    });
    
    const srcActs = data.trip_activities.filter(ta => Object.keys(stopMappings).includes(ta.stopId));
    const newActs = srcActs.map(ta => {
      return { ...ta, id: `ta_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`, stopId: stopMappings[ta.stopId] };
    });
    
    data.trips.unshift(newTrip);
    data.trip_stops.push(...newStops);
    data.trip_activities.push(...newActs);
  }
  
  db.save(data);
  showToast("Trip copied successfully to your dashboard! 🎉", "success");
  window.location.hash = "#my-trips";
}

// --- 17. PUBLIC READONLY TRIP CONTROLLER ---
function renderShare(tripId) {
  const data = db.get();
  const trip = data.trips.find(t => t.id === tripId) || data.trips[0];
  if (!trip) return;
  
  const cost = calculateTripCost(trip.id);
  const stops = data.trip_stops.filter(s => s.tripId === trip.id);
  const stopIds = stops.map(s => s.id);
  const tActivities = data.trip_activities.filter(ta => stopIds.includes(ta.stopId));
  
  const routeString = stops.map(s => data.cities[s.cityId]?.name || s.cityId).join(" → ");
  
  // Render Day overview cards (Readonly timeline layout)
  let timelineHtml = "";
  for (let dayNum = 1; dayNum <= trip.daysCount; dayNum++) {
    const stop = stops.find(s => s.days.includes(dayNum));
    const city = stop ? data.cities[stop.cityId] : null;
    const dayActs = tActivities.filter(ta => ta.day === dayNum);
    dayActs.sort((a, b) => a.startTime.localeCompare(b.startTime));
    
    let listHtml = "";
    if (dayActs.length > 0) {
      listHtml = dayActs.map(ta => {
        const act = data.activities.find(a => a.id === ta.activityId);
        if (!act) return "";
        return `
          <div style="display:flex; gap:16px; margin-bottom:12px;">
            <span style="font-weight:700; width:50px; font-size:0.85rem; color:var(--primary);">${ta.startTime}</span>
            <div>
              <h5 style="margin:0; font-weight:700;">${act.name}</h5>
              <span style="font-size:0.75rem; color:var(--text-muted);">${act.duration} hrs • ${act.category}</span>
            </div>
          </div>
        `;
      }).join("");
    } else {
      listHtml = `<p style="font-size:0.8rem; color:var(--text-muted);">Transit and Leisure time.</p>`;
    }
    
    timelineHtml += `
      <div style="background-color:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--border-radius-lg); padding:20px; margin-bottom:16px; box-shadow:var(--shadow-sm);">
        <h4 style="margin:0 0 12px 0; font-weight:800; font-size:1.1rem; display:flex; justify-content:space-between; align-items:center;">
          <span>Day ${dayNum} — ${city ? city.name : 'Transit Stop'}</span>
          <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">${dayActs.length} events</span>
        </h4>
        <div style="padding-left:8px; border-left:2px dashed var(--border-color);">
          ${listHtml}
        </div>
      </div>
    `;
  }
  
  mainContent.innerHTML = `
    <!-- Sticky tabs bar inside trip context -->
    <div class="trips-tabs-bar" style="margin-bottom: 24px;">
      <a href="#itinerary/${trip.id}" class="trips-tab">Itinerary Builder</a>
      <a href="#budget/${trip.id}" class="trips-tab">Budget Analyzer</a>
      <a href="#calendar/${trip.id}" class="trips-tab">Calendar View</a>
      <a href="#share/${trip.id}" class="trips-tab active"><i class="fa-solid fa-share-nodes"></i> Share Trip</a>
    </div>
    
    <div>
      
      <!-- Public page visual cover hero -->
      <div class="public-trip-cover" style="background-image: url('${trip.coverImg}')">
        <div class="public-trip-header-overlay">
          <div class="public-trip-title-info">
            <h1>${trip.name}</h1>
            <div class="public-trip-meta-row">
              <span><i class="fa-solid fa-route"></i> ${routeString}</span>
              <span>•</span>
              <span>${trip.daysCount} Days itinerary</span>
            </div>
          </div>
          
          <div class="public-trip-attribution">
            <img src="${data.users.avatar}">
            <span>Planned by ${data.users.name}</span>
          </div>
        </div>
      </div>
      
      <!-- Actions area -->
      <div style="background-color:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--border-radius-xl); padding:24px; box-shadow:var(--shadow-md); margin-bottom:32px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <h4 style="font-weight:700; margin:0 0 4px 0;">Shareable Public Itinerary</h4>
          <p style="color:var(--text-muted); font-size:0.85rem; margin:0;">Anyone with this link can view details or copy this trip to their profile dashboard.</p>
        </div>
        
        <div style="display:flex; gap:12px;">
          <button class="btn btn-primary" id="btn-copy-public-link"><i class="fa-solid fa-link"></i> Copy Link</button>
          <button class="btn btn-secondary btn-clone-trip" data-id="${trip.id}"><i class="fa-regular fa-copy"></i> Copy Trip</button>
        </div>
      </div>
      
      <!-- Split Details layouts -->
      <div class="itinerary-layout">
        
        <!-- Left: Readonly days sequence -->
        <div>
          <h3 style="font-size:1.35rem; margin-bottom:20px;">Itinerary Schedule</h3>
          ${timelineHtml}
        </div>
        
        <!-- Right: Budget snapshot -->
        <div>
          <h3 style="font-size:1.35rem; margin-bottom:20px;">Plan Expenses</h3>
          <div class="sticky-summary-card">
            <h4 style="margin:0 0 16px 0; font-weight:700;">Summary</h4>
            <div class="summary-sidebar-list">
              <div class="summary-sidebar-row">
                <span class="text-muted">Transport</span>
                <span>₹${cost.transport.toLocaleString()}</span>
              </div>
              <div class="summary-sidebar-row">
                <span class="text-muted">Accommodation</span>
                <span>₹${cost.accommodation.toLocaleString()}</span>
              </div>
              <div class="summary-sidebar-row">
                <span class="text-muted">Food</span>
                <span>₹${cost.food.toLocaleString()}</span>
              </div>
              <div class="summary-sidebar-row">
                <span class="text-muted">Activities</span>
                <span>₹${cost.activities.toLocaleString()}</span>
              </div>
              <div class="summary-sidebar-row total-row">
                <span>Total Estimates</span>
                <span style="color:var(--success);">₹${cost.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  `;
  
  // Link copying trigger
  document.getElementById("btn-copy-public-link").addEventListener("click", () => {
    const url = `${window.location.origin}${window.location.pathname}#public/${trip.publicSlug || `trip-${trip.id}`}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast("Shareable link copied to clipboard!", "success");
    }).catch(() => {
      showToast("Failed to copy link. Link: " + url, "warning");
    });
  });
  
  // Copy trip clone action
  document.querySelector(".btn-clone-trip").addEventListener("click", () => {
    cloneCommunityTrip(trip.id);
  });
}

async function renderPublicTrip(slug) {
  mainContent.innerHTML = `<div class="view-loader-container"><div class="loader-spinner"></div><p>Opening public itinerary...</p></div>`;
  try {
    const payload = await window.GlobeTrotterSync.publicTrip(slug);
    if (!payload) throw new Error("This itinerary is unavailable.");
    const cityById = Object.fromEntries(payload.cities.map(city => [city.id, city]));
    const activityById = Object.fromEntries(payload.activities.map(activity => [activity.id, activity]));
    const stopById = Object.fromEntries(payload.stops.map(stop => [stop.id, stop]));
    const timeline = payload.entries.sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime)).map(entry => {
      const city = cityById[stopById[entry.tripStopId]?.cityId];
      const activity = activityById[entry.activityId];
      return `<div class="public-day-card"><span class="public-day-date">${entry.date} · ${entry.startTime}</span><h4>${activity?.name || "Planned activity"}</h4><p>${city?.name || "Destination"} · ${activity?.category || "Experience"}</p></div>`;
    }).join("");
    const cover = payload.trip.coverPhoto?.startsWith("http") ? payload.trip.coverPhoto : "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85";
    mainContent.innerHTML = `<section class="public-itinerary-shell"><div class="public-trip-cover" style="background-image:url('${cover}')"><div class="public-trip-header-overlay"><div class="public-trip-title-info"><span class="eyebrow">GLOBETROTTER PUBLIC ITINERARY</span><h1>${payload.trip.name}</h1><p>${payload.trip.startDate} — ${payload.trip.endDate}</p></div></div></div><div class="public-itinerary-actions"><div><h3>A route shared by ${payload.owner?.name || "a GlobeTrotter"}</h3><p>View-only itinerary. Sign in to make a private copy for yourself.</p></div><button class="btn btn-primary" id="public-copy-trip">Copy this trip</button></div><div class="public-itinerary-timeline">${timeline || "<p>No activities have been added yet.</p>"}</div></section>`;
    document.getElementById("public-copy-trip").addEventListener("click", async () => {
      try {
        await window.GlobeTrotterSync.copyPublicTrip(slug);
        showToast("Itinerary copied to your travel desk!", "success");
        window.location.hash = "#my-trips";
      } catch (error) {
        sessionStorage.setItem("globetrotter_pending_public_copy", slug);
        showToast("Sign in securely to copy this itinerary to your travel desk.", "success");
        window.GlobeTrotterAuth.start();
      }
    });
  } catch (error) {
    mainContent.innerHTML = `<div class="empty-list-state"><i class="fa-solid fa-link-slash"></i><h3>Itinerary unavailable</h3><p>This public trip may have been disabled or the link may be incorrect.</p><a class="btn btn-primary" href="#login">Return to GlobeTrotter</a></div>`;
  }
}

// --- 18. PROFILE VIEW CONTROLLER ---
function renderProfile() {
  const data = db.get();
  mainContent.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto;">
      <h1 style="font-size:2.25rem; font-weight:800; margin-bottom:24px;">Your Profile</h1>
      
      <div class="upcoming-hero-card" style="padding:32px; display:flex; flex-direction:column; gap:24px; margin-bottom:32px;">
        <div style="display:flex; align-items:center; gap:24px; flex-wrap:wrap;">
          <img src="${data.users.avatar}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; border:3px solid var(--primary-light);">
          <div>
            <h2 style="font-size:1.5rem; font-weight:800; margin:0 0 4px 0;">${data.users.name}</h2>
            <span style="color:var(--primary); font-weight:700; font-size:0.9rem; background-color:var(--primary-light); padding:4px 10px; border-radius:99px;">${data.users.travelStyle} Traveler</span>
            <p style="color:var(--text-muted); font-size:0.85rem; margin:10px 0 0 0;">${data.users.email}</p>
          </div>
        </div>
      </div>
      
      <div class="upcoming-hero-card" style="padding:32px; display:flex; flex-direction:column; gap:20px;">
        <h3 style="font-size:1.25rem; font-weight:700; border-bottom:1px solid var(--border-color); padding-bottom:12px; margin:0;">Account Settings</h3>
        
        <div class="form-group">
          <label>Preferred Travel Style</label>
          <div class="style-selector-group">
            <div class="style-option ${data.users.travelStyle === 'Budget' ? 'selected' : ''}" data-pstyle="Budget">
              <h4>Budget</h4>
            </div>
            <div class="style-option ${data.users.travelStyle === 'Balanced' ? 'selected' : ''}" data-pstyle="Balanced">
              <h4>Balanced</h4>
            </div>
            <div class="style-option ${data.users.travelStyle === 'Premium' ? 'selected' : ''}" data-pstyle="Premium">
              <h4>Premium</h4>
            </div>
          </div>
        </div>
        
        <div class="form-group" style="margin:0; text-align:right;">
          <button class="btn btn-secondary" onclick="db.reset()" style="margin-right:12px;"><i class="fa-solid fa-rotate-left"></i> Reset Seed Data</button>
          <button class="btn btn-primary" id="btn-save-profile-settings">Save Settings</button>
        </div>
      </div>
    </div>
  `;
  
  // Style setting listeners
  document.querySelectorAll("[data-pstyle]").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll("[data-pstyle]").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
    });
  });
  
  // Save settings action
  document.getElementById("btn-save-profile-settings").addEventListener("click", () => {
    const sel = document.querySelector("[data-pstyle].selected").getAttribute("data-pstyle");
    data.users.travelStyle = sel;
    db.save(data);
    
    // Sync UI components
    document.querySelector(".user-badge").textContent = `${sel} Traveler`;
    
    showToast("Profile settings saved successfully!", "success");
  });
}

// --- 19. ADMIN PANEL VIEW CONTROLLER (Lightweight Analytics) ---
function renderAdmin() {
  mainContent.innerHTML = `
    <div>
      <h1 style="font-size:2.25rem; font-weight:800; margin-bottom:4px;">Admin Analytics</h1>
      <p style="color:var(--text-muted); margin-bottom:28px;">Live platform indicators from the authenticated GlobeTrotter database.</p>
      
      <div class="budget-summary-grid">
        <div class="budget-widget-card">
          <p>Trips Created</p>
          <h3 id="admin-total-trips">—</h3>
          <i class="fa-solid fa-route widget-icon-bg"></i>
        </div>
        <div class="budget-widget-card">
          <p>System Users</p>
          <h3 id="admin-total-users">—</h3>
          <i class="fa-solid fa-users widget-icon-bg"></i>
        </div>
        <div class="budget-widget-card">
          <p>Public Trips</p>
          <h3 id="admin-public-trips">—</h3>
          <i class="fa-solid fa-coins widget-icon-bg"></i>
        </div>
      </div>
      
      <div class="upcoming-hero-card" style="padding:24px;">
        <h3 style="font-weight:700; font-size:1.2rem; margin-bottom:16px;">Popular Cities Stop Counts</h3>
        
        <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.95rem;">
          <thead>
            <tr style="border-bottom:1.5px solid var(--border-color); color:var(--text-muted); font-weight:700;">
              <th style="padding:10px 8px;">City Name</th>
              <th style="padding:10px 8px;">Country</th>
              <th style="padding:10px 8px;">Rating</th>
              <th style="padding:10px 8px;">Stops Planned</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="4" style="padding:18px 8px; color:var(--text-muted);">Loading protected analytics…</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  window.GlobeTrotterSync?.adminStatistics().then(stats => {
    document.getElementById("admin-total-trips").textContent = stats.totalTrips.toLocaleString();
    document.getElementById("admin-total-users").textContent = stats.totalUsers.toLocaleString();
    document.getElementById("admin-public-trips").textContent = stats.publicTrips.toLocaleString();
    const data = db.get();
    const body = mainContent.querySelector("tbody");
    body.innerHTML = stats.topCities.map(city => {
      const clientCity = data.cities[Object.keys(data.cities).find(id => data.cities[id].name === city.name)];
      return `<tr style="border-bottom:1px solid var(--border-color);"><td style="padding:12px 8px; font-weight:700;">${city.name}</td><td style="padding:12px 8px; color:var(--text-muted);">${clientCity?.country || "—"}</td><td style="padding:12px 8px; font-weight:600;"><i class="fa-solid fa-star" style="color:var(--accent);"></i> ${city.popularity}</td><td style="padding:12px 8px; font-weight:700; color:var(--primary);">Catalog activity</td></tr>`;
    }).join("");
  }).catch(() => {
    const body = mainContent.querySelector("tbody");
    body.innerHTML = `<tr><td colspan="4" style="padding:18px 8px; color:var(--danger);">Administrative access is required to view platform analytics.</td></tr>`;
  });
}

// Settings fallback view
function renderSettings() {
  mainContent.innerHTML = `
    <div style="max-width: 800px; margin:0 auto;">
      <h1 style="font-size:2.25rem; font-weight:800; margin-bottom:24px;">Settings</h1>
      <div class="upcoming-hero-card" style="padding:32px; display:flex; flex-direction:column; gap:20px;">
        <h3 style="font-weight:700; margin:0 0 12px 0;">Application Controls</h3>
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-color); padding-bottom:16px;">
          <div>
            <h4 style="font-weight:700; margin-bottom:2px;">Reset Workspace Database</h4>
            <p style="color:var(--text-muted); font-size:0.8rem; margin:0;">Revert all custom trips, activity updates, and settings back to original seeded default state.</p>
          </div>
          <button class="btn btn-danger" onclick="db.reset()"><i class="fa-solid fa-arrows-rotate"></i> Reset DB</button>
        </div>
        
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h4 style="font-weight:700; margin-bottom:2px;">Platform Version</h4>
            <p style="color:var(--text-muted); font-size:0.8rem; margin:0;">Current deployment version for hackathon review.</p>
          </div>
          <span style="font-weight:700; color:var(--text-muted);">v2.4.0 (Stable)</span>
        </div>
      </div>
    </div>
  `;
}

// Helper date range formatter e.g. "Sep 10 - Sep 15"
function formatDateRange(startStr, endStr) {
  const start = new Date(startStr);
  const end = new Date(endStr);
  
  const mNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const startM = mNames[start.getMonth()];
  const endM = mNames[end.getMonth()];
  
  if (start.getMonth() === end.getMonth()) {
    return `${startM} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
  } else {
    return `${startM} ${start.getDate()} - ${endM} ${end.getDate()}, ${start.getFullYear()}`;
  }
}

// --- 21. AUTHENTICATION PAGES CONTROLLER (LOGIN & REGISTER) ---
function renderLogin() {
  mainContent.innerHTML = `
    <section class="nature-login-page" aria-label="GlobeTrotter secure sign in">
      <div class="nature-login-card">
        <div class="nature-login-brand">
          <span class="nature-login-mark"><i class="fa-solid fa-earth-americas"></i></span>
          <span>Globe<span>Trotter</span></span>
        </div>
        <h1>Welcome Back</h1>
        <p class="nature-login-subtitle">Plan smarter. Explore further. Travel your way.</p>
        <div class="nature-login-fields" aria-label="Secure account entry">
          <label for="login-account-preview">Email address</label>
          <div class="nature-login-input"><i class="fa-regular fa-envelope"></i><input id="login-account-preview" type="text" value="Secure GlobeTrotter account" readonly tabindex="-1" aria-readonly="true"></div>
          <label for="login-password-preview">Password</label>
          <div class="nature-login-input"><i class="fa-solid fa-lock"></i><input id="login-password-preview" type="password" value="protected" readonly tabindex="-1" aria-readonly="true"></div>
        </div>
        <button type="button" id="login-secure-entry" class="nature-login-button">Sign In <i class="fa-solid fa-right-to-bracket"></i></button>
        <p class="nature-login-footer">Don’t have an account? <a href="#register">Create Account</a></p>
      </div>
    </div>
  `;

  // Attach submit handler
  document.getElementById("login-secure-entry").addEventListener("click", () => {
    if (window.GlobeTrotterAuth?.start) {
      showToast("Opening secure sign in…", "success");
      window.GlobeTrotterAuth.start();
    } else showToast("Secure sign in is still initializing. Please try again.", "warning");
  });
}

function renderRegister() {
  mainContent.innerHTML = `
    <section class="nature-login-page" aria-label="Create a GlobeTrotter account">
      <div class="nature-login-card nature-register-card">
        <div class="nature-login-brand">
          <span class="nature-login-mark"><i class="fa-solid fa-earth-americas"></i></span>
          <span>Globe<span>Trotter</span></span>
        </div>
        <h1>Start Your Journey</h1>
        <p class="nature-login-subtitle">Build a personal travel desk for every route ahead.</p>
        <div class="nature-login-fields" aria-label="Secure account creation">
          <label for="register-account-preview">Email address</label>
          <div class="nature-login-input"><i class="fa-regular fa-envelope"></i><input id="register-account-preview" type="text" value="Secure GlobeTrotter account" readonly tabindex="-1" aria-readonly="true"></div>
          <label for="register-password-preview">Password</label>
          <div class="nature-login-input"><i class="fa-solid fa-lock"></i><input id="register-password-preview" type="password" value="protected" readonly tabindex="-1" aria-readonly="true"></div>
        </div>
        <button type="button" id="register-secure-entry" class="nature-login-button">Create Account <i class="fa-solid fa-user-plus"></i></button>
        <p class="nature-login-footer">Already have an account? <a href="#login">Sign In</a></p>
      </div>
    </section>
  `;

  // Attach submit handler
  document.getElementById("register-secure-entry").addEventListener("click", () => {
    if (window.GlobeTrotterAuth?.start) {
      showToast("Opening secure account creation…", "success");
      window.GlobeTrotterAuth.start();
    } else showToast("Secure account creation is still initializing. Please try again.", "warning");
  });
}

function handleLogout() {
  window.GlobeTrotterSync?.logout();
  localStorage.removeItem("globetrotter_logged_in");
  localStorage.removeItem("globetrotter_current_user");
  showToast("Logged out successfully.", "success");
  window.location.hash = "#login";
}

// --- 20. INITIALIZATION ROUTER SETUP ---
router.add("#login", renderLogin);
router.add("#register", renderRegister);
router.add("#logout", handleLogout);
router.add("#dashboard", renderDashboard);
router.add("#create-trip", renderCreateTrip);
router.add("#my-trips", renderMyTrips);
router.add("#explore", renderExplore);
router.add("#calendar", renderCalendar);
router.add("#community", renderCommunity);
router.add("#settings", renderSettings);
router.add("#profile", renderProfile);
router.add("#admin", renderAdmin);

// Dynamic path routing registration
router.add("#itinerary/:id", renderItinerary);
router.add("#budget/:id", renderBudget);
router.add("#calendar/:id", renderCalendar);
router.add("#share/:id", renderShare);
router.add("#public/:id", renderPublicTrip);

// Start routing listener
router.init();

/* ==========================================================================
   MODULE A: 3D INTERACTIVE GLOBE
   Uses Three.js when WebGL is available, falls back to CSS globe.
   ========================================================================== */
function initGlobe(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Check WebGL support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl || typeof THREE === 'undefined') {
    // CSS Fallback Globe
    container.innerHTML = `
      <div class="globe-css-fallback">
        <i class="fa-solid fa-earth-americas"></i>
      </div>`;
    return;
  }

  // Three.js Scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.z = 2.5;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const size = container.offsetWidth || 320;
  renderer.setSize(size, size);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  canvas.id = 'globe-canvas';
  container.appendChild(renderer.domElement);

  // Earth sphere — dark premium look
  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const material = new THREE.MeshPhongMaterial({
    color: 0x1a1a3e,
    emissive: 0x110A28,
    specular: 0x6846E8,
    shininess: 25,
    transparent: true,
    opacity: 0.95,
  });
  const earth = new THREE.Mesh(geometry, material);
  scene.add(earth);

  // Wireframe overlay (lat/lon grid lines)
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x6846E8,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  });
  const wireGeo = new THREE.SphereGeometry(1.005, 24, 24);
  const wireframe = new THREE.Mesh(wireGeo, wireMat);
  scene.add(wireframe);

  // Atmospheric glow shell
  const atmGeo = new THREE.SphereGeometry(1.12, 32, 32);
  const atmMat = new THREE.MeshPhongMaterial({
    color: 0x6846E8,
    transparent: true,
    opacity: 0.06,
    side: THREE.BackSide,
  });
  const atmosphere = new THREE.Mesh(atmGeo, atmMat);
  scene.add(atmosphere);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0x9B7BFF, 1.2);
  dirLight.position.set(2, 1.5, 2);
  scene.add(dirLight);
  const backLight = new THREE.DirectionalLight(0x6846E8, 0.4);
  backLight.position.set(-2, -1, -2);
  scene.add(backLight);

  // Helper: convert lat/lon to 3D position on sphere
  function latLonToVec3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
       radius * Math.cos(phi),
       radius * Math.sin(phi) * Math.sin(theta)
    );
  }

  // Destination data: Mumbai→Dubai→Paris→London→New York→Tokyo
  const destinations = [
    { name: 'Mumbai',   lat: 19.08,  lon: 72.88 },
    { name: 'Dubai',    lat: 25.20,  lon: 55.27 },
    { name: 'Paris',    lat: 48.86,  lon: 2.35  },
    { name: 'London',   lat: 51.51,  lon: -0.13 },
    { name: 'New York', lat: 40.71,  lon: -74.0 },
    { name: 'Tokyo',    lat: 35.69,  lon: 139.69 },
  ];

  // Glowing dot markers
  const dotGeo = new THREE.SphereGeometry(0.025, 8, 8);
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xFFB84D });
  destinations.forEach(dest => {
    const pos = latLonToVec3(dest.lat, dest.lon, 1.02);
    const dot = new THREE.Mesh(dotGeo, dotMat.clone());
    dot.position.copy(pos);
    scene.add(dot);

    // Glow ring around dot
    const ringGeo = new THREE.RingGeometry(0.03, 0.05, 16);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xFFB84D, transparent: true, opacity: 0.4, side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(pos);
    ring.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(ring);
  });

  // Arc route lines between destinations
  function createArc(from, to) {
    const points = [];
    const numPoints = 40;
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const p = new THREE.Vector3().lerpVectors(from, to, t);
      // Lift the arc above the surface
      const lift = Math.sin(Math.PI * t) * 0.28 + 1.02;
      p.normalize().multiplyScalar(lift);
      points.push(p);
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.003, 6, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0xA78BFA, transparent: true, opacity: 0.7
    });
    return new THREE.Mesh(tubeGeo, tubeMat);
  }

  for (let i = 0; i < destinations.length - 1; i++) {
    const fromPos = latLonToVec3(destinations[i].lat, destinations[i].lon, 1);
    const toPos = latLonToVec3(destinations[i + 1].lat, destinations[i + 1].lon, 1);
    scene.add(createArc(fromPos, toPos));
  }

  // Mouse interaction state
  let mouseX = 0, mouseY = 0;
  let targetRotX = 0, targetRotY = 0;

  document.addEventListener('mousemove', (e) => {
    // Only react when container is visible
    const rect = container.getBoundingClientRect();
    if (rect.width === 0) return;
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.4;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
  });

  // Auto-rotation + mouse parallax animation
  let rafId;
  let isVisible = true;
  const clock = new THREE.Clock();

  function animate() {
    if (!isVisible) return;
    rafId = requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Smooth auto-rotation
    earth.rotation.y += 0.003;
    wireframe.rotation.y += 0.003;

    // Mouse parallax influence
    targetRotX += (mouseY - targetRotX) * 0.05;
    targetRotY += (mouseX - targetRotY) * 0.05;
    earth.rotation.x = targetRotX;
    wireframe.rotation.x = targetRotX;

    renderer.render(scene, camera);
  }
  animate();

  // Pause when not visible (performance)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible) animate();
    }, { threshold: 0.1 });
    observer.observe(container);
  }

  // Responsive resize
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(() => {
      const newSize = container.offsetWidth || 320;
      renderer.setSize(newSize, newSize);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(container);
  }
}

/* ==========================================================================
   MODULE B: INTERACTIVE TRAVEL ROUTE VISUALIZATION
   Renders glowing destination chain with hover tooltip cards.
   ========================================================================== */
function renderRouteVisualization(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const destinations = [
    { city: 'Mumbai',   country: 'India',         icon: 'fa-city',        temp: '32°C', time: 'Origin',     flag: '🇮🇳' },
    { city: 'Dubai',    country: 'UAE',            icon: 'fa-building',    temp: '41°C', time: '3h 30m',     flag: '🇦🇪' },
    { city: 'Paris',    country: 'France',         icon: 'fa-eiffel-tower',temp: '22°C', time: '7h 15m',     flag: '🇫🇷' },
    { city: 'London',   country: 'United Kingdom', icon: 'fa-landmark',    temp: '18°C', time: '1h 20m',     flag: '🇬🇧' },
    { city: 'New York', country: 'USA',            icon: 'fa-city',        temp: '26°C', time: '7h 45m',     flag: '🇺🇸' },
    { city: 'Tokyo',    country: 'Japan',          icon: 'fa-torii-gate',  temp: '28°C', time: '14h 00m',    flag: '🇯🇵' },
  ];

  const nodesHtml = destinations.map((dest, idx) => {
    const isLast = idx === destinations.length - 1;
    return `
      <div class="route-node">
        <div class="route-node-dot">
          <span style="font-size:1.1rem">${dest.flag}</span>
        </div>
        <div class="route-node-label">${dest.city}</div>
        <div class="route-node-country">${dest.country}</div>
        <!-- Hover tooltip card -->
        <div class="route-node-tooltip">
          <div class="tooltip-city-name">${dest.flag} ${dest.city}</div>
          <div class="tooltip-row"><i class="fa-solid fa-temperature-half"></i><span>${dest.temp}</span></div>
          <div class="tooltip-row"><i class="fa-solid fa-plane"></i><span>${dest.time}</span></div>
          <div class="tooltip-row"><i class="fa-solid fa-earth-americas"></i><span>${dest.country}</span></div>
        </div>
      </div>
      ${!isLast ? `<div class="route-arc"><span class="route-arc-plane"><i class="fa-solid fa-plane"></i></span></div>` : ''}
    `;
  }).join('');

  container.innerHTML = `
    <div class="route-viz-section">
      <div class="route-viz-title">Mumbai → Dubai → Paris → London → New York → Tokyo</div>
      <div class="route-viz-subtitle">Hover over any destination to see travel details</div>
      <div class="route-chain-container">${nodesHtml}</div>
    </div>`;
}

/* ==========================================================================
   MODULE C: 3D CARD TILT EFFECT
   Mouse movement tilts trip cards in 3D. Disabled on mobile/touch devices.
   ========================================================================== */
function initCardTilt() {
  // Skip on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const cards = document.querySelectorAll('.trip-card-3d');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;   // max ±6deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      card.style.setProperty('--rotateX', `${rotateX}deg`);
      card.style.setProperty('--rotateY', `${rotateY}deg`);

      // Parallax for card image
      const img = card.querySelector('.trip-card-3d-img img');
      if (img) {
        const parallaxY = (y - centerY) / centerY * -6;
        img.style.transform = `scale(1.08) translateY(${parallaxY}px)`;
      }

      // Dynamic shadow shift
      const shadowX = (x - centerX) / centerX * 12;
      const shadowY = (y - centerY) / centerY * 12;
      card.style.boxShadow = `${shadowX}px ${shadowY + 12}px 40px rgba(104, 70, 232, 0.2)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.setProperty('--rotateX', '0deg');
      card.style.setProperty('--rotateY', '0deg');
      card.style.boxShadow = '';
      const img = card.querySelector('.trip-card-3d-img img');
      if (img) img.style.transform = 'scale(1.05) translateY(0px)';
    });
  });
}

/* ==========================================================================
   MODULE D: ANIMATED STATISTICS COUNTER
   Count-up animation triggered when stat cards scroll into view.
   ========================================================================== */
function animateCounters() {
  const stats = document.querySelectorAll('.stat-number[data-target]');
  if (!stats.length) return;

  function countUp(el) {
    if (el._counted) return;
    el._counted = true;
    const target = parseInt(el.getAttribute('data-target'));
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * ease);
      el.textContent = prefix + current.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
        }
      });
    }, { threshold: 0.5 });
    stats.forEach(stat => observer.observe(stat));
  } else {
    // Fallback: animate immediately
    stats.forEach(countUp);
  }
}

/* ==========================================================================
   MODULE E: PREMIUM DASHBOARD BUDGET ANALYZER
   Full CRUD expense manager with circular SVG progress ring,
   animated category bar charts, warning banners, localStorage persistence.
   ========================================================================== */
function getBudgetData() {
  const state = db.get();
  const activeTrip = state.trips?.[0];
  const categoryForDashboard = (category) => {
    const value = String(category || 'other').toLowerCase();
    if (value === 'stay' || value === 'accommodation') return 'accommodation';
    if (value === 'transport' || value === 'transportation') return 'transport';
    return value;
  };
  return {
    tripId: activeTrip?.id || null,
    total: Number(activeTrip?.budget || 0),
    categories: {
      accommodation: Number(activeTrip?.accommodationCost || 0),
      food: Number(activeTrip?.foodCost || 0),
      transport: Number(activeTrip?.transportCost || 0),
      activities: 0,
      shopping: 0
    },
    expenses: (state.expenses || []).filter(expense => !activeTrip || expense.tripId === activeTrip.id).map(expense => ({ ...expense, category: categoryForDashboard(expense.category) }))
  };
}

function saveBudgetData(data) {
  const state = db.get();
  const activeTrip = state.trips?.find(trip => trip.id === data.tripId) || state.trips?.[0];
  if (!activeTrip) return;
  activeTrip.budget = Number(data.total || 0);
  state.expenses = (state.expenses || []).filter(expense => expense.tripId !== activeTrip.id);
  state.expenses.push(...data.expenses.map(expense => ({ ...expense, tripId: activeTrip.id, category: String(expense.category || 'other') })));
  db.save(state);
}

function renderDashboardBudgetAnalyzer(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const data = getBudgetData();
  refreshBudgetUI(container, data);
}

function refreshBudgetUI(container, data) {
  const spent = data.expenses.reduce((acc, e) => acc + e.amount, 0);
  const remaining = data.total - spent;
  const spentPct = Math.min(Math.round((spent / data.total) * 100), 100);

  // SVG ring calculation
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * spentPct / 100);

  // Category config
  const catConfig = {
    accommodation: { label: 'Accommodation', icon: 'fa-bed',        color: '#6846E8', bg: 'rgba(104,70,232,0.1)'  },
    food:          { label: 'Food',           icon: 'fa-utensils',   color: '#FFB84D', bg: 'rgba(255,184,77,0.12)' },
    transport:     { label: 'Transport',      icon: 'fa-plane',      color: '#10B981', bg: 'rgba(16,185,129,0.1)'  },
    activities:    { label: 'Activities',     icon: 'fa-camera',     color: '#EF4444', bg: 'rgba(239,68,68,0.1)'   },
    shopping:      { label: 'Shopping',       icon: 'fa-bag-shopping',color:'#8B5CF6', bg: 'rgba(139,92,246,0.1)'  },
  };

  // Calculate per-category totals from expenses
  const catTotals = {};
  Object.keys(catConfig).forEach(k => { catTotals[k] = 0; });
  data.expenses.forEach(e => {
    if (catTotals[e.category] !== undefined) catTotals[e.category] += e.amount;
  });

  const maxCat = Math.max(...Object.values(catTotals), 1);

  // Category bars HTML
  const barsHtml = Object.entries(catConfig).map(([key, cfg]) => {
    const amt = catTotals[key] || 0;
    const pct = Math.round((amt / maxCat) * 100);
    return `
      <div class="budget-category-row">
        <div class="budget-cat-icon" style="background:${cfg.bg};color:${cfg.color}">
          <i class="fa-solid ${cfg.icon}"></i>
        </div>
        <div class="budget-cat-name">${cfg.label}</div>
        <div class="budget-bar-wrap">
          <div class="budget-bar-track">
            <div class="budget-bar-fill" style="width:0%;background:${cfg.color}" data-target="${pct}"></div>
          </div>
        </div>
        <div class="budget-cat-amount">₹${amt.toLocaleString()}</div>
      </div>`;
  }).join('');

  // Expenses list HTML
  const expensesHtml = data.expenses.map(exp => {
    const cfg = catConfig[exp.category] || catConfig.activities;
    return `
      <div class="expense-item" data-id="${exp.id}">
        <div class="expense-cat-dot" style="background:${cfg.color}"></div>
        <span class="expense-desc">${exp.desc}</span>
        <span class="expense-cat-tag">${cfg.label}</span>
        <span class="expense-amount">₹${exp.amount.toLocaleString()}</span>
        <div class="expense-item-actions">
          <button class="expense-action-btn edit" data-id="${exp.id}" title="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="expense-action-btn delete" data-id="${exp.id}" title="Delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
  }).join('');

  // Warning logic
  const dailyBudget = Math.round(data.total / 6);
  const dailySpent = Math.round(spent / 6);
  const dailyOverPct = dailyBudget > 0 ? Math.round(((dailySpent - dailyBudget) / dailyBudget) * 100) : 0;
  const showWarning = dailySpent > dailyBudget;

  const warningHtml = showWarning
    ? `<div class="budget-warning-banner"><i class="fa-solid fa-triangle-exclamation"></i><span>You are spending <strong>${dailyOverPct}% more</strong> than your planned daily budget.</span></div>`
    : '';

  const activitiesOverspend = catTotals.activities - (data.categories.activities || 0);
  const tipSavings = activitiesOverspend > 0 ? activitiesOverspend : 1500;
  const tipHtml = `<div class="budget-tip-banner"><i class="fa-solid fa-lightbulb"></i><span>Reduce activity spending by <strong>₹${tipSavings.toLocaleString()}</strong> to stay on track with your budget goals.</span></div>`;

  container.innerHTML = `
    <div class="budget-analyzer-section">
      <!-- Header -->
      <div class="budget-analyzer-header">
        <div>
          <h2><i class="fa-solid fa-wallet" style="color:var(--primary);margin-right:10px;"></i>Budget Analyzer</h2>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-top:4px;">Track your travel spending in real-time</p>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <span style="font-size:0.82rem;color:var(--text-muted);">Trip budget:</span>
          <span style="font-size:1.1rem;font-weight:800;color:var(--primary);">₹${data.total.toLocaleString()}</span>
        </div>
      </div>

      <!-- Main body: ring + bars -->
      <div class="budget-analyzer-body">
        <!-- Circular ring -->
        <div class="budget-ring-wrap">
          <div class="budget-ring-svg-container">
            <svg class="budget-ring-svg" viewBox="0 0 180 180" width="180" height="180">
              <defs>
                <linearGradient id="budgetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#6846E8;stop-opacity:1"/>
                  <stop offset="100%" style="stop-color:#9B7BFF;stop-opacity:1"/>
                </linearGradient>
              </defs>
              <circle class="budget-ring-bg" cx="90" cy="90" r="${radius}"/>
              <circle class="budget-ring-progress" cx="90" cy="90" r="${radius}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${circumference}"
                id="budget-ring-circle"/>
            </svg>
            <div class="budget-ring-center">
              <div class="budget-ring-percent" id="budget-ring-pct">0%</div>
              <div class="budget-ring-sublabel">Spent</div>
            </div>
          </div>
          <!-- Totals grid -->
          <div class="budget-totals-grid">
            <div class="budget-total-item type-total">
              <span class="budget-total-label">Total</span>
              <span class="budget-total-value">₹${data.total.toLocaleString()}</span>
            </div>
            <div class="budget-total-item type-spent">
              <span class="budget-total-label">Spent</span>
              <span class="budget-total-value">₹${spent.toLocaleString()}</span>
            </div>
            <div class="budget-total-item type-remaining">
              <span class="budget-total-label">Remaining</span>
              <span class="budget-total-value">₹${Math.max(remaining, 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <!-- Category bars -->
        <div class="budget-bars-section">
          ${barsHtml}
        </div>
      </div>

      <!-- Warnings & Tips -->
      <div class="budget-warnings-section">
        ${warningHtml}
        ${tipHtml}
      </div>

      <!-- Expense Manager -->
      <div class="budget-expenses-section">
        <div class="budget-expenses-header">
          <h4>Expense Log</h4>
          <button class="btn btn-primary" id="btn-show-expense-form" style="padding:8px 16px;font-size:0.85rem;">
            <i class="fa-solid fa-plus"></i> Add Expense
          </button>
        </div>

        <!-- Add Expense Form (hidden by default) -->
        <div class="expense-add-form" id="expense-add-form" style="display:none;">
          <div class="expense-form-group">
            <label>Category</label>
            <select id="exp-cat">
              <option value="accommodation">Accommodation</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="activities">Activities</option>
              <option value="shopping">Shopping</option>
            </select>
          </div>
          <div class="expense-form-group">
            <label>Description</label>
            <input type="text" id="exp-desc" placeholder="e.g. Hotel booking">
          </div>
          <div class="expense-form-group">
            <label>Amount (₹)</label>
            <input type="number" id="exp-amount" placeholder="0" min="1">
          </div>
          <div>
            <button class="btn btn-primary" id="btn-save-expense" style="width:100%;padding:10px;">
              <i class="fa-solid fa-check"></i> Save
            </button>
          </div>
        </div>

        <!-- Expense list -->
        <div class="expense-list" id="expense-list">
          ${expensesHtml}
        </div>
      </div>
    </div>`;

  // Animate ring after DOM insertion
  setTimeout(() => {
    const ring = document.getElementById('budget-ring-circle');
    const pctEl = document.getElementById('budget-ring-pct');
    if (ring) {
      ring.style.strokeDashoffset = dashOffset;
      // Animate percent text
      let current = 0;
      const target = spentPct;
      const interval = setInterval(() => {
        current = Math.min(current + 2, target);
        if (pctEl) pctEl.textContent = current + '%';
        if (current >= target) clearInterval(interval);
      }, 20);
    }

    // Animate bar fills
    document.querySelectorAll('.budget-bar-fill').forEach(bar => {
      const targetPct = bar.getAttribute('data-target');
      setTimeout(() => { bar.style.width = targetPct + '%'; }, 100);
    });
  }, 150);

  // --- Event Listeners ---

  // Toggle add form
  const showFormBtn = document.getElementById('btn-show-expense-form');
  const form = document.getElementById('expense-add-form');
  if (showFormBtn) {
    showFormBtn.addEventListener('click', () => {
      const isVisible = form.style.display !== 'none';
      form.style.display = isVisible ? 'none' : 'grid';
      showFormBtn.innerHTML = isVisible
        ? '<i class="fa-solid fa-plus"></i> Add Expense'
        : '<i class="fa-solid fa-xmark"></i> Cancel';
    });
  }

  // Save expense
  const saveBtn = document.getElementById('btn-save-expense');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const cat = document.getElementById('exp-cat').value;
      const desc = document.getElementById('exp-desc').value.trim();
      const amount = parseInt(document.getElementById('exp-amount').value);

      if (!desc) { showToast('Please enter a description.', 'error'); return; }
      if (!amount || amount < 1) { showToast('Please enter a valid amount.', 'error'); return; }

      const budgetData = getBudgetData();
      const newExpense = {
        id: 'e_' + Date.now(),
        desc,
        category: cat,
        amount
      };
      budgetData.expenses.push(newExpense);
      saveBudgetData(budgetData);
      refreshBudgetUI(container, budgetData);
      showToast('Expense added successfully!', 'success');
    });
  }

  // Delete expense
  document.querySelectorAll('.expense-action-btn.delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const budgetData = getBudgetData();
      budgetData.expenses = budgetData.expenses.filter(e => e.id !== id);
      saveBudgetData(budgetData);
      refreshBudgetUI(container, budgetData);
      showToast('Expense deleted.', 'warning');
    });
  });

  // Edit expense (inline prompt)
  document.querySelectorAll('.expense-action-btn.edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const budgetData = getBudgetData();
      const exp = budgetData.expenses.find(e => e.id === id);
      if (!exp) return;

      // Use existing modal system
      const modalBody = `
        <div class="form-group">
          <label>Description</label>
          <input type="text" id="edit-exp-desc" value="${exp.desc}">
        </div>
        <div class="form-group">
          <label>Amount (₹)</label>
          <input type="number" id="edit-exp-amount" value="${exp.amount}" min="1">
        </div>
        <div class="form-group">
          <label>Category</label>
          <select id="edit-exp-cat">
            <option value="accommodation" ${exp.category === 'accommodation' ? 'selected' : ''}>Accommodation</option>
            <option value="food"          ${exp.category === 'food'          ? 'selected' : ''}>Food</option>
            <option value="transport"     ${exp.category === 'transport'     ? 'selected' : ''}>Transport</option>
            <option value="activities"    ${exp.category === 'activities'    ? 'selected' : ''}>Activities</option>
            <option value="shopping"      ${exp.category === 'shopping'      ? 'selected' : ''}>Shopping</option>
          </select>
        </div>`;
      const modalFooter = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" id="btn-save-edit-expense">Save Changes</button>`;
      const close = openModal('Edit Expense', modalBody, modalFooter);

      document.getElementById('btn-save-edit-expense').addEventListener('click', () => {
        const newDesc   = document.getElementById('edit-exp-desc').value.trim();
        const newAmt    = parseInt(document.getElementById('edit-exp-amount').value);
        const newCat    = document.getElementById('edit-exp-cat').value;
        if (!newDesc || !newAmt || newAmt < 1) {
          showToast('Please fill in all fields.', 'error');
          return;
        }
        exp.desc     = newDesc;
        exp.amount   = newAmt;
        exp.category = newCat;
        saveBudgetData(budgetData);
        close();
        refreshBudgetUI(container, budgetData);
        showToast('Expense updated!', 'success');
      });
    });
  });
}

/* ==========================================================================
   MODULE F: SECTION FADE-IN ON SCROLL (IntersectionObserver)
   ========================================================================== */
function initSectionFadeIn() {
  const sections = document.querySelectorAll('.section-fade-in');
  if (!sections.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    sections.forEach(sec => observer.observe(sec));
  } else {
    sections.forEach(sec => sec.classList.add('visible'));
  }
}
