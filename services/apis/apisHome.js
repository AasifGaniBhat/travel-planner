import {
  BANNERS,
  BOOKING,
  BRANDS,
  CABTYPES,
  CATEGORIES,
  CATEGORY_PRODUCTS,
  EVENTS,
  GUIDES,
  HOTELS,
  LATEST_PRODUCTS,
  MY_BOOKINGS,
  PRODUCTS_FROM_CATEGORY,
  WISHLIST,
  DESTINATIONS,
} from "../constants/apiEndPointsHome";

import { GetApi, PostApi } from "./crudApis";

export const LatestProducts = () => GetApi(LATEST_PRODUCTS);
export const ProductsOfCategory = (category_id) =>
  GetApi(CATEGORY_PRODUCTS + category_id);
export const Categories = () => GetApi(CATEGORIES);
export const Brands = () => GetApi(BRANDS);
export const Banners = () => GetApi(BANNERS);
export const GetEvents = () => GetApi(EVENTS);
export const GetCabTypes = () => GetApi(CABTYPES);
export const GetDestinations = () => GetApi(DESTINATIONS);
export const GetHotels = () => GetApi(HOTELS);
export const GetGuides = () => GetApi(GUIDES);
export const PurchaseBooking = () => PostApi(BOOKING);
export const MyBookings = () => PostApi(MY_BOOKINGS);
