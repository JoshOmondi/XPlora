-- CREATE PROCEDURE CreateBooking(
--     @p_tourist_name VARCHAR(255),
--     @p_tour_id INT,
--     @p_booking_date DATE
-- )
-- AS
-- BEGIN
--     DECLARE @available_seats INT;

--     SELECT @available_seats = (SELECT total_seats - COUNT(*) AS available_seats
--                                 FROM Bookings
--                                 WHERE tour_id = @p_tour_id
--                                       AND booking_date = @p_booking_date
--                                 GROUP BY total_seats);

--     IF @available_seats > 0
--     BEGIN
--         INSERT INTO Bookings (tourist_name, tour_id, booking_date, total_seats)
--         VALUES (@p_tourist_name, @p_tour_id, @p_booking_date, @available_seats);

--         SELECT 'Booking successful' AS message;
--     END
--     ELSE
--     BEGIN
--         SELECT 'No available seats for the selected tour and date' AS message;
--     END
-- END;
