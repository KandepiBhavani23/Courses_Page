import React from "react";
import { Link } from "react-router-dom";

import showcaseIcon from "../../assets/images/showcase_image.jpg";
const OverViewTab = () => {
	const data = {
		ttl: "About this course",
		desc: "Learn and master this course by building real web apps with React and Node",
		skillLevel: "Intermediate Level",
		students: 59241,
		languages: ["English"],
		captions: "Yes",
		lectures: 116,
		totalDur: "13.5",
		crsDesc: `
		Python is a general-purpose interpreted, interactive, object-oriented, and high-level programming language. It was created by Guido van Rossum during 1985-1990. Like Perl, Python source code is also available under the GNU General Public License (GPL). This tutorial gives enough understanding of the Python programming language.

Why to Learn Python?
- Python is a high-level, interpreted, interactive and object-oriented scripting language. Python is designed to be highly readable. It uses English keywords frequently, whereas other languages use punctuation, and it has fewer syntactical constructions than other languages.

Advantages of learning Python:
- Python is Interpreted: Python is processed at runtime by the interpreter. You do not need to compile your program before executing it. This is similar to PERL and PHP.
- Python is Interactive: You can actually sit at a Python prompt and interact with the interpreter directly to write your programs.
- Python is Object-Oriented: Python supports the Object-Oriented style or technique of programming that encapsulates code within objects.
- Python is a Beginner's Language: Python is a great language for beginner-level programmers and supports the development of a wide range of applications from simple text processing to WWW browsers to games.

Characteristics of Python:
- It supports functional and structured programming methods as well as OOP.
- It can be used as a scripting language or can be compiled to byte-code for building large applications.
- It provides very high-level dynamic data types and supports dynamic type checking.
- It supports automatic garbage collection.
- It can be easily integrated with C, C++, COM, ActiveX, CORBA, and Java.

Python's popularity:
- Easy-to-learn: Python has few keywords, a simple structure, and a clearly defined syntax. This allows the student to pick up the language quickly.
- Easy-to-read: Python code is more clearly defined and visible to the eyes.
- Easy-to-maintain: Python's source code is fairly easy-to-maintain.
- A broad standard library: Python's bulk of the library is very portable and cross-platform compatible on UNIX, Windows, and Macintosh.
- Interactive Mode: Python has support for an interactive mode, which allows interactive testing and debugging of code snippets.
- Portable: Python can run on a wide variety of hardware platforms and has the same interface on all platforms.
- Extendable: You can add low-level modules to the Python interpreter, enabling programmers to add or customize their tools to be more efficient.
- Databases: Python provides interfaces to all major commercial databases.
- GUI Programming: Python supports GUI applications that can be created and ported to many system calls, libraries, and windows systems, such as Windows MFC, Macintosh, and the X Window system of Unix.
- Scalable: Python provides a better structure and support for large programs than shell scripting.

What you'll learn:
- Learn Python From Scratch
- Understanding Python Essentials and Concepts
- Hands-On project: Build a Web App Directory Discovery
- Practice Step By Step

Course requirements or prerequisites:
- Nothing, just Patience and Eager to Learn!

Who this course is for:
- DevOps Engineers
- DevSecOps Engineers
- Developers
- System Administrator
- IT Engineers
		`,
		instructor: {
			name: "MMZ Academy",
			img: showcaseIcon,
			ttl: "Knowledge should be available for every one",
			desc: `Knowledge should be available for every one that's our motto ...

we've Helped a lot of people to find Jobs by teaching them the needed skills.

here you will see that our courses are Filler-Free and straight to the point ... to avoid wasting your time.`,
		},
	};

	return (
		<div className="w-full h-full p-4 text-light-blue">
			<div className="w-full h-auto">
				<h1 className="text-2xl">{data.ttl}</h1>
				<div className="text-base m-4">{data.desc}</div>
			</div>
			<div className="p-1 flex gap-1 border-t-[1px] border-t-dark-navy">
				<div className="w-full max-w-[25%]">By the numbers</div>
				<div className="w-full">
					<div className="text-base mx-2 my-0 flex gap-2">
						<span className="mb-4">Skill Level:</span>
						<span className="">{data.skillLevel}</span>
					</div>
					<div className="text-base mx-2 my-0 flex gap-2">
						<span className="">Students:</span>
						<span className="">{data.skillLevel}</span>
					</div>
					<div className="text-base mx-2 my-0 flex gap-2">
						<span className="">Languages:</span>
						<span className="">{data.languages?.toString()}</span>
					</div>
					<div className="text-base mx-2 my-0 flex gap-2">
						<span className="">Captions:</span>
						<span className="">{data.captions}</span>
					</div>
					<div className="text-base mx-2 my-0 flex gap-2">
						<span className="">Lectures:</span>
						<span className="">{data.lectures}</span>
					</div>
					<div className="text-base mx-2 my-0 flex gap-2">
						<span className="">Video:</span>
						<span className="">{data.totalDur}</span>
					</div>
				</div>
			</div>
			<div className="p-4 flex gap-4 border-t-gray-400 border-t-[1px]">
				<div className="w-full max-w-[25%]">Certificates</div>
				<div className="w-full">
					<div className="mb-4">
						Get Udemy certificate by completing entire course
					</div>
					<button className="bg-black text-white px-5 py-2">
						Udemy Certificate
					</button>
				</div>
			</div>
			<div className="p-4 flex gap-4 border-t-gray-400 border-t-[1px]">
				<div className="w-full max-w-[25%]">Features</div>
				<div className="w-full">
					<div className="mb-4">
						Available on
						<Link to="/" className="font-medium m-2 text-vivid-pink">
							iOS
						</Link>
						and
						<Link className="font-medium m-2 text-vivid-pink" to="/">
							Android
						</Link>
					</div>
				</div>
			</div>
			<div className="p-4 flex gap-4 border-t-gray-400 border-t-[1px]">
				<div className="w-full max-w-[25%]">Description</div>
				<div className="w-full">
					{data.crsDesc.split("\n").map((paragraph, index) => (
						<p key={index} className="leading-8 text-vivid-pink">
							{paragraph}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default OverViewTab;
