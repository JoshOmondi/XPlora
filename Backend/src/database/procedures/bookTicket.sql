-- CreateBooking stored procedure
--use TOUR
ALTER PROCEDURE CreateBooking(
  @booking_id varchar(250),
  @tourist_name VARCHAR(200),
  @tour_id INT,
  @booking_date DATE,
  @total_seats INT,
  @price DECIMAL(10, 2),
  @tour_name VARCHAR(255)
)
AS
BEGIN
 
  -- Insert the new booking
  INSERT INTO Bookings (booking_id, tourist_name, tour_id, booking_date, total_seats, price, tour_name)
  VALUES (@booking_id, @tourist_name, @tour_id, @booking_date, @total_seats, @price, @tour_name);

END;
