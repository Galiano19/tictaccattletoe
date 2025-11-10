import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCoordinates } from "../../app/api/coordinates/useCoordinates";
import React from "react";

// Mock fetch for testing
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("useCoordinates", () => {
  let queryClient: QueryClient;
  beforeAll(() => {
    process.env.NEXT_PUBLIC_COORDINATES_API_KEY = "test-api-key";
  });

  afterAll(() => {
    delete process.env.NEXT_PUBLIC_COORDINATES_API_KEY;
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

  const mockResponse = [
    {
      lat: "40.7128",
      lon: "-74.0060",
      display_name: "New York, NY, USA",
    },
  ];

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should call the API with the correct parameters", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const { result } = renderHook(() => useCoordinates("New York"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("geocode.maps.co/search?q=New%20York")
    );
  });

  it("should fetch data when a location is sent as parameter", async () => {
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const { result } = renderHook(() => useCoordinates("New York"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      name: "New York",
      x: "-74.0060",
      y: "40.7128",
    });
  });
});
