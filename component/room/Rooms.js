"use client";

import { useEffect, useState, Suspense } from "react";
import { Container, Box, Grid, Typography, Skeleton } from "@mui/material";
import { useSearchParams } from "next/navigation";
import RoomCard from "./RoomCard";
import { mainHeadingStyles, subHeadingStyles } from "./HeadingStyles";

// Tách phần sử dụng useSearchParams ra component riêng
const RoomsContent = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const searchParamsObj = {
    checkIn: searchParams.get("checkIn"),
    checkOut: searchParams.get("checkOut"),
    guests: searchParams.get("guests"),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        if (searchParamsObj.checkIn)
          params.append("checkIn", searchParamsObj.checkIn);

        if (searchParamsObj.checkOut)
          params.append("checkOut", searchParamsObj.checkOut);

        if (searchParamsObj.guests)
          params.append("guests", searchParamsObj.guests);

        let url = `${process.env.API}/homeroom`;

        if (
          searchParamsObj.checkIn ||
          searchParamsObj.checkOut ||
          searchParamsObj.guests
        ) {
          url = `${process.env.API}/homeroom/${params.toString()}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  // Skeleton loader component
  const RoomCardSkeleton = () => (
    <Box sx={{ height: "100%" }}>
      <Skeleton variant="rectangular" height={220} />
      <Box sx={{ p: 2 }}>
        <Skeleton width="60%" height={32} />
        <Skeleton width="40%" height={24} sx={{ mt: 1 }} />
        <Skeleton width="100%" height={72} sx={{ mt: 1 }} />
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Skeleton width="20%" height={30} />
          <Skeleton width="20%" height={30} />
          <Skeleton width="20%" height={30} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Skeleton width="40%" height={24} />
          <Skeleton width="30%" height={24} />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ padding: "2rem" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={mainHeadingStyles}
        >
          Nhận phòng và thư giãn
        </Typography>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={subHeadingStyles}
        >
          Tận hưởng dịch vụ khách sạn đẳng cấp của chúng tôi.
        </Typography>

        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <RoomCardSkeleton />
                </Grid>
              ))
            : rooms.map((room) => (
                <Grid item xs={12} sm={6} md={4} key={room._id}>
                  <RoomCard room={room} searchParams={searchParamsObj} />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  );
};

// Component loading fallback
const RoomsLoadingFallback = () => (
  <Container maxWidth="xl">
    <Box sx={{ padding: "2rem" }}>
      <Skeleton variant="text" width="40%" height={50} sx={{ mx: "auto" }} />
      <Skeleton
        variant="text"
        width="60%"
        height={30}
        sx={{ mx: "auto", mb: 3 }}
      />
      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Skeleton variant="rectangular" height={300} />
          </Grid>
        ))}
      </Grid>
    </Box>
  </Container>
);

// Component chính - wrap trong Suspense
const RoomsRates = () => {
  return (
    <Suspense fallback={<RoomsLoadingFallback />}>
      <RoomsContent />
    </Suspense>
  );
};

export default RoomsRates;
