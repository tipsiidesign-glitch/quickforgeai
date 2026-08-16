
REVOKE EXECUTE ON FUNCTION public.get_leaderboard(TEXT, INTEGER, INTEGER) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_my_stats() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.search_users(TEXT, INTEGER) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.submit_attempt(UUID) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.respond_friend_request(UUID, BOOLEAN) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.username_available(TEXT) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_friend_request() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(TEXT, INTEGER, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_my_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION public.search_users(TEXT, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_attempt(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.respond_friend_request(UUID, BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION public.username_available(TEXT) TO authenticated;
