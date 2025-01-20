import { saveUserData } from "./src/app/utils/firebase.js";

(async () => {
  try {
    const testUserId = "testUser123";
    const testUserData = {
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      createdAt: new Date().toISOString(),
    };
    await saveUserData(testUserId, testUserData);
    console.log("Test user data saved successfully!");
  } catch (error) {
    console.error("Error saving test user data:", error);
  }
})();
