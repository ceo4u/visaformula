import { NextResponse } from "next/server";

export async function GET() {
  const mockExperts = [
    {
      id: "1",
      name: "Priya Sharma",
      role: "RCIC - Canada Immigration Consultant",
      rating: 4.9,
      reviews: 243,
      price: 1500,
      city: "Hyderabad",
      isRemote: true,
      isEmergency: true,
      tags: ["Student Visa", "Work Permit", "PR"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "US Immigration Lawyer",
      rating: 4.8,
      reviews: 189,
      price: 2500,
      city: "Mumbai",
      isRemote: true,
      isEmergency: false,
      tags: ["H1-B", "Green Card", "Work Visa"],
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
    },
    {
      id: "3",
      name: "Sarah Khan",
      role: "UK Visa Consultant",
      rating: 4.7,
      reviews: 156,
      price: 1800,
      city: "Delhi",
      isRemote: true,
      isEmergency: true,
      tags: ["Student Visa", "Work Visa", "Tourist Visa"],
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
    },
  ];
  
  return NextResponse.json(mockExperts);
}
