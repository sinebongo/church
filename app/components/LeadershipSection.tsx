import React from "react";


// Only show Bishop (poster) and Director, reference leadership page for more
const mainLeaders = [
  {
    name: "Rt Rev GA Seane",
    role: "Bishop",
    image: "/bishop.jpg",
    quote: "Beloved in Christ, as we journey together in faith, let us remember that our strength is found in unity and our hope in Christ alone. May the Lord guide and bless each of you as you serve with humility, love, and unwavering faith. Together, let us be a light to the world, steadfast in prayer and bold in our witness. Remain rooted in grace and let your lives reflect the love of our Savior.",
    color: "bg-[#e1c575] text-[#2f3a82]"
  },
  {
    name: "Kgosi Nkagiseng Rammekwa",
    role: "Director",
    image: "/kgosi.jpg",
    quote: `Test all things; hold fast to what is good. – 1 Thessalonians 5:21,
    As young believers, we are called to be rooted in Christ, united in faith, and bold in service. The Youth League exists to nurture spiritual growth, encourage fellowship, and empower youth for leadership and outreach. Let us stand firm in truth, transform our communities with Christ’s love, and move forward together in God’s mission.`,
    color: "bg-[#2f3a82] text-white"
  }
];


import Link from "next/link";

const LeadershipSection = () => {
  return (
    <section id="leadership" className="w-full py-16 px-4 md:px-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2f3a82] text-center mb-10 tracking-tight drop-shadow">Meet Our Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {mainLeaders.map((leader, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 border-[#2f3a82]/10 hover:scale-105 transition-transform duration-300">
              <div className={`w-28 h-28 rounded-full flex items-center justify-center text-4xl font-extrabold mb-4 border-4 ${leader.color} border-[#2f3a82]/20 shadow-lg overflow-hidden`}> 
                <img src={leader.image} alt={leader.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-2xl font-bold text-[#2f3a82] mb-1">{leader.name}</h3>
              <p className="text-base font-medium text-gray-600 mb-2">{leader.role}</p>
              <blockquote className="italic text-gray-700 text-center mb-2 border-l-4 border-[#e1c575] pl-4">{leader.quote}</blockquote>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/leadership" className="bg-[#2f3a82] hover:bg-[#e1c575] hover:text-[#2f3a82] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-200 text-lg">
            View More Team Members
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
