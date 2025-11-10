import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useWeather } from "../../app/api/weather/useWeather";
import React from "react";

// Mock fetch for testing
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("useWeather", () => {
  let queryClient: QueryClient;
  beforeAll(() => {
    process.env.NEXT_PUBLIC_WEATHER_API_KEY = "test-api-key";
  });

  afterAll(() => {
    delete process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  });

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
          staleTime: 0,
        },
      },
    });
    mockFetch.mockClear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should call the API with the correct parameters", async () => {
    const mockResponse = {
      location: {
        name: "New York",
      },
      current: {
        temp_c: 22.5,
        humidity: 65,
        condition: {
          text: "clear sky",
          icon: "01d",
          code: 1000,
        },
      },
    };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const { result } = renderHook(
      () => useWeather({ lat: "40.7128", lon: "-74.0060" }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "http://api.weatherapi.com/v1/current.json?key=test-api-key&q=40.7128,-74.0060&aqi=no"
      )
    );
  });

  it("should fetch data when lat and lon are provided", async () => {
    const mockResponse = {
      location: {
        name: "New York",
      },
      current: {
        temp_c: 22.5,
        humidity: 65,
        condition: {
          text: "clear sky",
          icon: "01d",
          code: 1000,
        },
      },
    };

    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const { result } = renderHook(
      () => useWeather({ lat: "40.7128", lon: "-74.0060" }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({
      condition: {
        text: "clear sky",
        icon: "01d",
        code: 1000,
      },
      humidity: 65,
      location: "New York",
      temperatureC: 22.5,
    });
  });
});
