'use client'

export default function FounderStory() {
  return (
    <section id="story" className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <div className="order-2 lg:order-1">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                From Trauma to Transformation
              </h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>2014.</strong> A single moment changed everything. The car accident left me in a coma, 
                  and when I woke up, my memory was shattered. Simple conversations became impossible. 
                  Reading felt like trying to hold water in my hands.
                </p>
                
                <p>
                  During the long months of recovery, audiobooks and podcasts became my lifeline. 
                  When my eyes couldn't focus on text, my ears could still learn. But there was a crushing problem: 
                  <strong>I couldn't remember anything I'd heard.</strong>
                </p>
                
                <p>
                  Hours of content would vanish from my mind like morning mist. The frustration was overwhelming. 
                  Here I was, desperate to rebuild my cognitive abilities, but traditional learning methods 
                  had completely failed me.
                </p>
                
                <p className="text-primary-600 font-semibold bg-primary-50 p-4 rounded-lg border-l-4 border-primary-500">
                  That's when I discovered something profound: My brain injury had given me the same challenges 
                  that millions of people with ADHD face every day. The techniques I developed to overcome 
                  my memory loss were exactly what ADHD brains had always needed.
                </p>

                <p>
                  Through trial, error, and relentless experimentation, I developed a system: 
                  <strong>instant capture, spaced repetition, and bite-sized summaries.</strong> 
                  Instead of trying to remember everything, I learned to capture the essential moments 
                  and review them in a way that actually stuck.
                </p>

                <p>
                  Summit isn't just an app—it's the culmination of a decade-long journey to understand 
                  how memory actually works when your brain doesn't follow the "normal" rules. 
                  Every feature exists because someone like us told me what they needed.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-primary-600">10+</div>
                  <div className="text-sm text-gray-600">Years of recovery research</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">1000+</div>
                  <div className="text-sm text-gray-600">Hours of testing</div>
                </div>
              </div>

              {/* Founder Quote */}
              <blockquote className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-primary-500">
                <p className="text-gray-700 italic mb-4">
                  "My accident taught me that there's no shame in needing different tools to learn. 
                  If you've ever felt frustrated by forgetting what you just heard, you're not broken—
                  you just need a system that works with your brain, not against it."
                </p>
                <footer className="text-sm text-gray-600">
                  — Tom, Co-Founder
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Founder Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-24 h-24 mx-auto mb-4 bg-primary-200 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">Tom</p>
                    <p className="text-sm">Co-Founder</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-200 rounded-full opacity-30"></div>
              
              {/* Achievement Badge */}
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-700">Co-Founder</span>
                </div>
              </div>

              {/* Mission Badge */}
              <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 max-w-32">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary-600">2014</div>
                  <div className="text-xs text-gray-600">Journey began</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Summit Exists
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Because everyone deserves tools that work with their brain, not against it. 
              Whether you're recovering from trauma, living with ADHD, or simply tired of forgetting 
              what you learn—you're not alone, and you're not broken.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                🧠 Memory-Friendly
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                🎯 ADHD-Tested
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                ♿ Accessibility-First
              </span>
              <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                💪 Survivor-Built
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}