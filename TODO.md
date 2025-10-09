# Task: Fix back button redirect issue after login and enhance landing page behavior

## Completed Steps
- [x] Analyze the authentication flow and identify the issue: Login page doesn't redirect authenticated users
- [x] Modify app/auth/login/page.tsx to add useEffect that redirects to dashboard if user is authenticated
- [x] Modify app/auth/signup/page.tsx to add similar redirect logic
- [x] Rename local loading states to avoid conflicts with useAuth loading
- [x] Modify app/page.tsx (landing page) to redirect authenticated users to their respective dashboards

## Followup Steps
- [ ] Test the complete flow:
  - Visit landing page when logged in -> should redirect to dashboard
  - Login -> Dashboard -> Click back button -> Should redirect back to dashboard instead of staying on login page
  - Test for both artist and user roles
  - Verify no infinite redirect loops occur
