import AdminLayout from "@/pages/admin/layouts";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function LoadingTable() {
  return (
    <table class="min-w-full">
      <tbody class="bg-white">
        <tr>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div class="flex items-center">
              <div>
                <div class="text-sm leading-5 text-gray-800 text-center">
                  Loading
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
