import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Navbar/Sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { TypeAnimation } from 'react-type-animation'; // You'll need to install this: npm install react-type-animation

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();
  const [userQuestions, setUserQuestions] = useState([]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (user?._id) {
      axios
        .get(`${baseUrl}/api/questions/user/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setUserQuestions(res.data.questions);
        })
        .catch((error) => {
          console.error("Failed to fetch questions:", error);
        });
    }
  }, [navigate, user, baseUrl]);

  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      <div className="flex w-full pt-16"> {/* Added pt-16 to account for fixed navbar if applicable */}
        {/* Sidebar Overlay/Container */}
        <div className={`${isOpen ? "w-64" : "w-0 overflow-hidden"} transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900`}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">

          {/* --- COOL HERO SECTION --- */}
          <section className="relative overflow-hidden bg-white dark:bg-gray-950 py-24 px-8 border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left Side: Slogan */}
              <div className="text-left space-y-6">
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 mb-4">
                  v2.0 is live
                </Badge>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  Turning <span className="text-blue-600">Coffee</span> <br />
                  Into <span className="text-emerald-500">Code.</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
                  ThinkHub is where the world’s developers solve problems, share snippets, and build their digital legacy. Don't just debug alone—collaborate.
                </p>

                <div className="flex gap-4 pt-4">
                  {user ? (
                    <div className="flex items-center gap-4">
                      <Button onClick={() => navigate("/questions")} className="bg-blue-600 hover:bg-blue-700">Explore Feed</Button>
                      <p className="text-sm font-mono text-gray-500">Welcome back, {user.username}</p>
                    </div>
                  ) : (
                    <Button
                      onClick={() => navigate("/login")}
                      size="lg"
                      className="bg-gray-900 dark:bg-white dark:text-black hover:scale-105 transition-transform"
                    >
                      Initialize Session (Login)
                    </Button>
                  )}
                </div>
              </div>

              {/* Right Side: Terminal Greeting */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-gray-900 rounded-lg shadow-2xl p-6 font-mono text-sm md:text-base border border-gray-700">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-emerald-400">
                    <span className="text-blue-400">const</span> <span className="text-yellow-300">greetWorld</span> = () ={">"} {"{"}
                  </div>
                  <div className="pl-4 text-gray-300">
                    <span className="text-purple-400">return</span> (
                    <div className="pl-4 text-orange-300">
                      <TypeAnimation
                        sequence={[
                          '"Hello World!"', 2000,
                          '"Hola Mundo!"', 2000,
                          '"Bonjour le monde!"', 2000,
                          '"Namaste Duniyo!"', 2000,
                          '"Console.log("Success")"', 2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                      />
                    </div>
                    );
                  </div>
                  <div className="text-emerald-400">{"}"};</div>
                  <div className="mt-4 text-gray-500 border-t border-gray-800 pt-2 italic">
                    // Compilation successful...
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* User Stats (If logged in) */}
          {user && (
            <section className="py-8 px-6 -mt-12 relative z-10">
              <div className="max-w-4xl mx-auto flex justify-center gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center min-w-[150px]">
                  <span className="text-gray-500 text-xs uppercase tracking-widest mb-1">Reputation</span>
                  <span className="text-3xl font-bold text-blue-600">{user.reputation || 0}</span>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center min-w-[150px]">
                  <span className="text-gray-500 text-xs uppercase tracking-widest mb-1">Badges</span>
                  <span className="text-3xl font-bold text-yellow-500">🏅 {user.badges?.length || 0}</span>
                </div>
              </div>
            </section>
          )}

          {/* User Questions Section */}
          <div className="max-w-6xl mx-auto px-6 py-12">
            {user && userQuestions.length > 0 ? (
              <section className="mb-20">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold dark:text-white">Your Recent Activity</h2>
                  <Button variant="ghost" className="text-blue-600">View All</Button>
                </div>
                <div className="grid gap-4">
                  {userQuestions.map((q) => (
                    <Card key={q._id} className="hover:border-blue-400 transition-colors cursor-default bg-white dark:bg-gray-900">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <h3 className="text-lg font-bold hover:text-blue-600 cursor-pointer" onClick={() => navigate(`/question/${q._id}`)}>
                              {q.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{q.body}</p>
                            <div className="flex gap-2">
                              {q.tags?.map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-[10px]">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex md:flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg min-w-[100px]">
                            <span className="text-lg font-bold">{q?.upVotes?.length - q?.downVote?.length}</span>
                            <span className="text-[10px] uppercase text-gray-500 font-bold">Votes</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ) : !user && (
              /* If Not Logged In, show something else or the leaderboard */
              <section className="text-center py-10">
                <h2 className="text-3xl font-bold mb-10">Global Top Contributors</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: "Alice Johnson", points: 3200, rank: 1 },
                    { name: "Bob Smith", points: 2900, rank: 2 },
                    { name: "Charlie Brown", points: 2750, rank: 3 },
                  ].map((topUser, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 font-bold mx-auto mb-4">
                        #{topUser.rank}
                      </div>
                      <h4 className="font-bold text-xl mb-1">{topUser.name}</h4>
                      <p className="text-blue-500 font-mono">{topUser.points} EXP</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;