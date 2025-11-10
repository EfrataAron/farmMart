"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowLeft,
  FiCalendar,
  FiMapPin,
  FiDollarSign,
  FiCheckCircle,
  FiPlay,
  FiClock,
  FiPause,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Project, ProjectStatus } from "@/data/projectsData";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;

  const projects = useSelector((state: RootState) => state.projects.projects);

  // Find the project
  const project = projects.find((p: Project) => p.id.toString() === projectId);

  if (!project) {
    return notFound();
  }

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "ongoing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "on-hold":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case "completed":
        return <FiCheckCircle className="w-4 h-4" />;
      case "ongoing":
        return <FiPlay className="w-4 h-4" />;
      case "planning":
        return <FiClock className="w-4 h-4" />;
      case "on-hold":
        return <FiPause className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateDuration = () => {
    const start = new Date(project.startDate);
    const end = project.endDate ? new Date(project.endDate) : new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)} months`;
    } else {
      return `${Math.floor(diffDays / 365)} years`;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/projects"
              className="text-green-600 hover:text-green-700"
            >
              Projects
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="aspect-[16/6] relative overflow-hidden">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="text-white">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                      project.status
                    )}`}
                  >
                    <div className="flex items-center gap-2">
                      {getStatusIcon(project.status)}
                      {project.status.charAt(0).toUpperCase() +
                        project.status.slice(1)}
                    </div>
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {project.category}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  {project.title}
                </h1>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FiMapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    {formatDate(project.startDate)}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4" />$
                    {project.budget.toLocaleString()}
                  </div>
                </div>
              </div>

              <Link href="/projects">
                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <FiArrowLeft className="w-4 h-4" />
                  Back to Projects
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 py-8 sm:py-12 lg:py-16 xl:py-20">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Project Overview
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Images */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video relative rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`${project.title} image ${index + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies/Methods */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Technologies & Methods
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Stats */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status.charAt(0).toUpperCase() +
                        project.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-semibold text-gray-900">
                      ${project.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-900">
                      {calculateDuration()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Start Date</span>
                    <span className="font-semibold text-gray-900">
                      {formatDate(project.startDate)}
                    </span>
                  </div>
                  {project.endDate && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">End Date</span>
                      <span className="font-semibold text-gray-900">
                        {formatDate(project.endDate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {project.status === "ongoing" && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Progress
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Completion</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Team */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Team Members
                </h3>
                <div className="space-y-3">
                  {project.team.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-medium text-sm">
                          {member
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {member}
                        </div>
                        <div className="text-sm text-gray-600">Team Member</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Get in Touch
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Interested in this project? Contact our team for more
                  information.
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:projects@farmMart.com"
                    className="flex items-center gap-3 text-green-600 hover:text-green-700 transition-colors"
                  >
                    <FiMail className="w-4 h-4" />
                    <span className="text-sm">projects@farmMart.com</span>
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 text-green-600 hover:text-green-700 transition-colors"
                  >
                    <FiPhone className="w-4 h-4" />
                    <span className="text-sm">+1 (234) 567-890</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
